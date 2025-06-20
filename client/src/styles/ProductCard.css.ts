/* ─ ProductCard.css.ts ─ */
import { style, keyframes, globalStyle } from '@vanilla-extract/css';
import { sprinkles, colors, boxShadows, transitions } from './sprinkles.css';

/* 1 ▸ tiny lift animation for the whole card */
const lift = keyframes({
  from: { transform: 'translateY(0)' },
  to:   { transform: 'translateY(-4px)' },
});

/* 2 ▸ card shell */
export const card = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    gap: 'sm',
    background: 'surface',
    borderRadius: 'md',
    boxShadow: boxShadows.sm,
    transition: transitions.shadow,
  }),
  {
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    selectors: {
      '&:hover': {
        boxShadow: boxShadows.md,
        animation: `${lift} .95s ease forwards`,
      },
    },
  },
]);

export const bodyPanel = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    gap: 'sm',
    padding: 'sm',
  }),
  {
    /* Tonal overlay — works on light & dark themes */
    background: 'rgba(255,255,255,0.6)',
    backdropFilter: 'blur(4px) saturate(140%)',
    /* Blend gracefully into card corners */
    borderBottomLeftRadius: 'inherit',
    borderBottomRightRadius: 'inherit',
    /* Push price pill down if description wraps */
    marginTop: 'auto',
  },
]);


/* Optional: tweak heading & mute colour so they pop on the panel */
export const title = style({
  fontWeight: 600,
  lineHeight: 1.25,
  color: colors.text,          // stays theme-aware
});



/* 3 ▸ image thumbnail */
export const image = style({
  width: '100%',
  aspectRatio: '4 / 3',
  objectFit: 'cover',
});

/* 4 ▸ body block (name, desc, price) */
export const body = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    gap: 'sm',
    padding: 'sm',
  }),
  { marginTop: 'auto' },
]);

export const textMuted = style({
  color: colors.text,
  opacity: 0.75,
  fontSize: '.9rem',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
});

export const price = style([
  sprinkles({
    background: 'brand',
    color: 'surface',
    borderRadius: 'sm',
    padding: 'xs',
  }),
  { fontWeight: 600, fontSize: '.85rem' },
]);

/* 5 ▸ slide-in “Add to Cart” bar (base state) */

export const addBar = style([
  sprinkles({
    background: 'brand',
    color: 'surface',
    padding: 'sm',
  }),
  {
    position: 'absolute',
    insetInline: 0,
    bottom: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transform: 'translateY(120%)',          // base: hidden
    transition: 'transform .25s ease',
    cursor: 'pointer',
    zIndex: 1,
  },
]);

/* ▸ hover rule — now with !important so it always wins */
globalStyle(`${card}:hover .${addBar}`, {
  transform: 'translateY() !important',
});