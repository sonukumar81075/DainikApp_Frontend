/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'dainik-red': '#d62828',
        'dainik-gold': '#f4a261',
        'dainik-sand': '#f5f0e6'
      },
      boxShadow: {
        dainik: '0 10px 25px -10px rgba(0,0,0,0.2)'
      }
    }
  },
  plugins: []
};

