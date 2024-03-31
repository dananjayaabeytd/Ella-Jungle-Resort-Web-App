/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-green': '#75BA6F',
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

