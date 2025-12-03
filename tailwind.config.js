/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], 
      },
      colors: {
        ziyablue: '#00A0E3',
        ziyagreen: '#94C21A',
        ziyablack: '#4D4D4D',},

       borderRadius: {
      'primaryradius': '3px',
      'secondaryradius': '5px',
      'tertiaryradius': '10px',
    },
    },
    
  },
  
  plugins: [],
}

