const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: false, 
    darkTheme: false,
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
      }
    },
  },
  plugins: [flowbite.plugin(), require("daisyui")],
}