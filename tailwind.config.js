/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1E90FF',
          'blue-light': '#4DAAFF',
          'blue-dark': '#0066CC',
          'blue-glow': 'rgba(30,144,255,0.15)',
        },
        dark: {
          900: '#050A14',
          800: '#080E1C',
          700: '#0C1424',
          600: '#101A2E',
          500: '#162038',
          400: '#1C2840',
          300: '#243050',
        },
        neutral: {
          50:  '#F8FAFF',
          100: '#EEF2FF',
          200: '#C8D4F0',
          300: '#A0B0D8',
          400: '#7888B8',
          500: '#556090',
          600: '#3C4870',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-dark': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231E90FF' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'blue-glow': '0 0 30px rgba(30,144,255,0.25)',
        'blue-glow-sm': '0 0 15px rgba(30,144,255,0.2)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.6)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'pulse-blue': 'pulseBlue 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseBlue: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(30,144,255,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(30,144,255,0.6)' },
        },
      },
    },
  },
  plugins: [],
}
