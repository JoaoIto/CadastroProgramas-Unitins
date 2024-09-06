  /** @type {import('tailwindcss').Config} */
  module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      screens: {
        'sm': {'max': '760px'},
        // => @media (min-width: 640px and max-width: 767px) { ... }

        'md': {'min': '768px', 'max': '1023px'},
        // => @media (min-width: 768px and max-width: 1023px) { ... }

        'lg': {'min': '1024px'},
        // => @media (min-width: 1024px and max-width: 1279px) { ... }
      },
      colors: {
        transparent: 'transparent',
        white: "#fff",
        black: "#000",
        cinzaClaro: "#F5F5F5",
        cinzaTraco: "#ADADAD",
        azulEscuro: "#18428F",
        azulClaroGradient: "#8ed4ff",
        azulEscuroGradient: "#1F4B9F",
        verdeClaro: "#30D64C",
        vermelho: "#CF0E0E"
      },
      extend: {
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'gradient-conic':
            'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        },
      },
    },
    plugins: [],
  }
