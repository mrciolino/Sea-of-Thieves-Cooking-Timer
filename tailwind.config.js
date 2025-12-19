/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vscode: {
          bg: '#1e1e1e',
          sidebar: '#252526',
          editor: '#1e1e1e',
          highlight: '#2d2d30',
          border: '#3e3e42',
          accent: '#007acc',
          accentHover: '#1a8cd8',
          text: '#d4d4d4',
          textMuted: '#858585',
          success: '#89d185',
          warning: '#f9a825',
          error: '#f14c4c',
        }
      },
      animation: {
        'border-pulse': 'border-pulse 2s ease-in-out infinite',
        'progress-fill': 'progress-fill 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
      },
      keyframes: {
        'border-pulse': {
          '0%, 100%': {
            'box-shadow': '0 0 0 0 rgba(0, 122, 204, 0.7)',
          },
          '50%': {
            'box-shadow': '0 0 0 10px rgba(0, 122, 204, 0)',
          },
        },
        'progress-fill': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}