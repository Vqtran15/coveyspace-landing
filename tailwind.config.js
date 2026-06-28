import scrollbarHide from 'tailwind-scrollbar-hide'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        'league-gothic': ['"League Gothic"', 'sans-serif'],
      },
      colors: {
        coral: {
          DEFAULT: '#B85A3A',
        },
        jade: {
          50:      '#FEF4EE',
          DEFAULT: '#C4622D',
          700:     '#A85228',
        },
        lagoon: {
          600: '#C48A20',
        },
        sage: {
          20:  'rgba(161,204,166,0.2)',
          700: '#3D6E44',
        },
        sunrise: {
          DEFAULT: '#D4890A',
        },
      },
    },
  },
  plugins: [scrollbarHide],
}
