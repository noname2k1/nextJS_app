/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'red-bean': '#bc3848',
        'blue-bean': '#0167BC',
        edamame: '#40a49b',
        lentil: '#E16B4A',
        'black-bean': '#423E4D',
        coffee: '#6E4745',
        pinto: '#DBC1B0',
        'purple-bean': '#9C77CB',
        blackeye: '#F5ECDF',
        tutti: '#FFAFD2',
        gold: '#E5B338',
        spirit: '#8BACC1',
        'off-white-a': '#eff3f2',
        'off-white-b': '#dfdfdd',
        'off-white-c': '#bbbeb7',
        'off-white-d': '#a19e99',
        'red-filter': '#c62f42',
        'dark-blue': '#2f4773',
        'cool-gray': '#403e53',
        'dark-purple': '#46436e',
      },
      animation: {
        fade: 'fade .4s ease-in',
        gradient: 'gradient 2s linear infinite',
        down: 'down 2s linear',
        up: 'up 2s linear',
        wave1: 'wave 3s linear infinite',
        wave2: 'wave 4s linear infinite',
        wave3: 'wave 2s linear infinite',
        'bounce-horizontal':
          'bounce-horizontal 1s cubic-bezier(0,0,0.2,1) infinite',
        circular: 'circular 1s linear infinite',
      },
      keyframes: {
        fade: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        up: {
          from: {
            transform: 'translateY(-100%)',
          },
          to: {
            transform: 'translateY(1000%)',
          },
        },
        down: {
          from: {
            transform: 'translateY(-1000%)',
          },
          to: {
            transform: 'translateY(100%)',
          },
        },
        wave: {
          '0%': {
            height: '6px',
          },
          '20%': {
            height: '18px',
          },
          '40%': {
            height: '8px',
          },
          '60%': {
            height: '24px',
          },
          '80%': {
            height: '10px',
          },
          '100%': {
            height: '30px',
          },
        },
        'bounce-horizontal': {
          '0%': {
            transform: 'translateX(-25%)',
          },
          '50%': {
            transform: 'none',
          },
          '100%': {
            transform: 'translateX(-25%)',
          },
        },
        circular: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
      },
    },
    fontFamily: {
      sans: 'SB,MBP,Helvetica Neue,Helvetica,Arial,sans',
      KFA: 'KFA',
      'MSB-regular': 'MSB-Regular',
      'MSB-light': 'MSB-light',
      'MSB-bold': 'MSB-bold',
      'mono-light': 'mono-light',
      'mono-regular': 'mono-regular',
    },
  },
  darkMode: 'class',
  plugins: [
    // ...
    require('tailwind-scrollbar'),
  ],
};
