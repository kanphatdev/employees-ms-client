/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-spinner': '#ffb07c',
        'primary': '#ffb07c',
        'secondary': '#e5a186',
        'tertiary': '#457b9d',
        'accent': '#669bbc',
        'neutral':'#52575D'
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

