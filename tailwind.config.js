/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      scale: {
        '160': '1.6',
      },
      colors: {
        'my-pink': '#EF85D1',
        'login-form': 'rgba(255,255,255,0.6)',
      }
    },
  },
  plugins: [],
}
