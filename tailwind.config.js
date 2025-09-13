/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode colors
        'hotswap-white': '#FFFFFF',
        'hotswap-black': '#000000',
        'hotswap-gray': '#8E8E93',
        'hotswap-silver': '#F2F2F7',
        'hotswap-blue': '#007AFF',
        'hotswap-green': '#30D158',
        'hotswap-pink': '#FF2D55',
        'hotswap-red': '#FF3B30',
        
        // Dark mode colors
        'hotswap-charcoal': '#1C1C1E',
        'hotswap-dark-gray': '#2C2C2E',
        'hotswap-border': '#E5E5EA',
      },
      fontFamily: {
        'sf': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'card-dark': '0 2px 8px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}