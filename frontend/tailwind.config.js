/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F4FAFF',
        primary: {
          DEFAULT: '#45E27F',
          dark: '#22C55E',
        },
        text: {
          DEFAULT: '#120309',
          muted: '#6B7280',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out both',
        'fade-in-delay': 'fadeIn 0.6s ease-out 0.2s both',
        'fade-in-delay-long': 'fadeIn 0.6s ease-out 0.4s both',
        'fade-in-delay-extra': 'fadeIn 0.6s ease-out 0.6s both',
        'float-1': 'float1 4s ease-in-out infinite',
        'float-2': 'float2 5s ease-in-out infinite',
        'float-3': 'float3 4.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float1: {
          '0%, 100%': {
            transform: 'translateY(0) scale(1) rotate(-5deg)',
          },
          '50%': {
            transform: 'translateY(-15px) scale(1.1) rotate(5deg)',
          },
        },
        float2: {
          '0%, 100%': {
            transform: 'translateY(0) scale(1) rotate(5deg)',
          },
          '50%': {
            transform: 'translateY(-20px) scale(1.15) rotate(-5deg)',
          },
        },
        float3: {
          '0%, 100%': {
            transform: 'translateY(0) scale(1) rotate(0deg)',
          },
          '50%': {
            transform: 'translateY(-18px) scale(1.12) rotate(-8deg)',
          },
        },
      },
    },
  },
}
