/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    "./src/views/**/*.twig"
  ],
  content: [
    "./src/views/**/*.twig",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default'
    })
  ],
  darkMode: 'class'
}

