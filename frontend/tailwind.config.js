/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-green': '#75BA6F',
        'secondary-green': '#9CCC98'
      },

      transitionDuration: {
        '400': '400ms',
      },
      
      transitionTimingFunction: {
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      fontFamily: {
        inika: ['Inika', 'serif'],
        mclaren: ['McLaren', 'cursive'],
        lexend: ['Lexend', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

