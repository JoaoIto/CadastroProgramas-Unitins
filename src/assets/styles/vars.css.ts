import { createTheme } from '@vanilla-extract/css';

export const [themeClass, vars] = createTheme({
  color: {
    backWhite: '#cacaca',
    purple: '#2E2784'
  },
  
  space: {
    small: '5px',
    medium: '10px',
  },

  fonts: {
    Poppins: 'Poppins',
    Inter: 'Inter',
  }
});