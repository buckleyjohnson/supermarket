import { style } from '@vanilla-extract/css';

export const card = style({
  ':hover': {
    background: '#2563eb', // brand color
    color: '#fff',         // surface color
    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
    cursor: 'pointer',
  },
});