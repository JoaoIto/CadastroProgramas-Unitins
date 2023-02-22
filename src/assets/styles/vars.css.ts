import { createTheme } from '@vanilla-extract/css';

export const [themeClass, vars] = createTheme({
  color: {
    brand: 'blue',
    white: '#fff',
    backWhite: '#cacaca'
  },
  space: {
    small: '4px',
    medium: '8px',
  }
});