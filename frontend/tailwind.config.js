/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
      ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false, // desabilitado para evitar conflitos con PrimeNG
},
}

