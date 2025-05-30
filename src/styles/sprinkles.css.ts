import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles';

const space = { none: 0, xs: 4, sm: 8, md: 16, lg: 24 } as const;

const colors = {
    brand: '#2563eb',
    surface: '#ffffff',
    text: '#1f2937',
} as const;

const radii = { none: 0, sm: 4, md: 8, lg: 16 } as const;

const boxShadows = {
    sm: '0 1px 2px rgba(0,0,0,0.04)',
    md: '0 2px 8px rgba(0,0,0,0.08)',
    lg: '0 4px 16px rgba(0,0,0,0.12)',
} as const;

const transitions = {
    none: 'none',
    shadow: 'box-shadow 0.2s',
} as const;

const sizes = {
    full: '100%',
    sm: 220,
    md: 320,
    lg: 480,
} as const;

const responsiveProps = defineProperties({
    conditions: {
        mobile: {},
        tablet: { '@media': '(min-width: 640px)' },
        desktop: { '@media': '(min-width: 1024px)' },
    },
    defaultCondition: 'mobile',

    properties: {
        display: ['none', 'block', 'flex'],
        flexDirection: ['row', 'column'],
        justifyContent: ['flex-start', 'center', 'space-between'],
        alignItems: ['stretch', 'center'],
        gap: space,
        padding: space,
        paddingTop: space,
        paddingBottom: space,
        background: colors,
        color: colors,
        borderRadius: radii,
        boxShadow: Object.values(boxShadows),
        width: Object.values(sizes),
        maxWidth: Object.values(sizes),
        transition: Object.values(transitions),
    },

    shorthands: {
        p: ['padding'],
        pt: ['paddingTop'],
        pb: ['paddingBottom'],
        bg: ['background'],
        c: ['color'],
    },
} as const);

export const sprinkles = createSprinkles(responsiveProps);
export type Sprinkles = Parameters<typeof sprinkles>[0];