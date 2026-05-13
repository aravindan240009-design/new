/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0f2544',
        royal: '#1d4ed8',
      },
      boxShadow: {
        soft: '0 14px 40px rgba(15, 37, 68, 0.10)',
      },
    },
  },
  plugins: [],
};
