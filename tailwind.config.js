/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
      extend: {
        backgroundImage: {
          'hero-pattern': "url('/src/assets/imgs/background.png')",
      },
  },
  plugins: [],
  corePlugins: {
      preflight: false,
  },
  }
};