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
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
}
