/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",

    // flowbite
    "./node_modules/flowbite/**/*.js",
  ],
  theme: { extend: {}, },
  darkMode: 'class',
  plugins: [require('flowbite/plugin')],
}