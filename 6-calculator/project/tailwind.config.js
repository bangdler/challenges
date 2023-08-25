/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        btn: 'repeat(4, minmax(80px, 1fr))',
      },
    },
  },
  plugins: [],
};
