import { style } from '@vanilla-extract/css';
import { sprinkles } from './sprinkles.css';

export const grid = style([
  sprinkles({
    display: 'grid',
    gap: { mobile: 'sm', tablet: 'md' },  // tighter on phones
    padding: { mobile: 'sm', tablet: 'md' },
  }),
  {
    /* 220 px on phones → 260 px on desktop for nicer density   */
    gridTemplateColumns:
      'repeat(auto-fill, minmax(220px, 1fr))',
    '@media': {
      '(min-width: 1024px)': {
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
      },
    },
  },
]);
