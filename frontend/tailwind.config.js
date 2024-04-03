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

      fontFamily: {
        inika: ['Inika', 'serif'],
        mclaren: ['McLaren', 'cursive'],
        lexend: ['Lexend', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

