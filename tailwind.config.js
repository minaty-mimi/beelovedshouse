/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'amatic': ['Amatic SC', 'cursive'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        'peach': {
          100: '#FFE5D9',
          200: '#FFCAB0',
          300: '#FFB088',
          400: '#FF9A6B',
          500: '#FF8A50',
          600: '#E6673A',
          700: '#CC4125',
          800: '#B32D15',
          900: '#99210A'
        },
        'cream': {
          50: '#FFFEF7',
          100: '#FFF8DC',
          200: '#FFF2B8',
          300: '#FFEC94',
          400: '#FFE670',
          500: '#FFE04C',
          600: '#E6C743',
          700: '#CCAE3A',
          800: '#B39531',
          900: '#997C28'
        },
        'lavender': {
          100: '#F3F0FF',
          200: '#E6E6FA',
          300: '#D8D0F5',
          400: '#CABAF0',
          500: '#BCA4EB',
          600: '#A993D4',
          700: '#9682BD',
          800: '#8371A6',
          900: '#70608F'
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}