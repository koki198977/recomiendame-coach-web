/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue"
  ],
  theme: {
    extend: {
      colors: {
        // Paleta "Naturaleza Moderna"
        primary: {
          50: '#F0F8F4',
          100: '#D9EFE4',
          200: '#B8E0CE',
          300: '#93D0B5',
          400: '#74B796', // Sage Green - Color principal
          500: '#5FA582',
          600: '#4A8A6B',
          700: '#3A6F56',
          800: '#2D5543',
          900: '#1F3A2E',
        },
        secondary: {
          50: '#FDF5F2',
          100: '#FAE6DF',
          200: '#F5CCBF',
          300: '#F0B29F',
          400: '#E88D72', // Warm Clay - Color secundario
          500: '#E37456',
          600: '#D85A3D',
          700: '#B84A30',
          800: '#943B26',
          900: '#6F2C1C',
        },
        gray: {
          50: '#FAFAF6', // Off-White - Fondo principal
          100: '#F5F5F0',
          200: '#E8E8E0',
          300: '#D4D4C8',
          400: '#B0B0A0',
          500: '#8C8C78',
          600: '#6B6B58',
          700: '#4A4A3C',
          800: '#3A3A2E',
          900: '#2C3E36', // Deep Forest - Texto principal
        },
        // Alias para facilitar el uso
        sage: '#74B796',
        clay: '#E88D72',
        offwhite: '#FAFAF6',
        forest: '#2C3E36',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}