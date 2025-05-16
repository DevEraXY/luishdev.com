/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'monokai-bg': '#272822',
        'monokai-text': '#f8f8f2',
        'monokai-green': '#a6e22e',
        'monokai-orange': '#fd971f',
        'monokai-pink': '#f92672',
        'monokai-yellow': '#e6db74',
        'monokai-cyan': '#66d9ef',
      },
    },
  },
  plugins: []
}
