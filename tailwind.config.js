/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  mode: 'jit',
  purge: [
    './public/**/*.html',
    './src/**/*.{jstsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

