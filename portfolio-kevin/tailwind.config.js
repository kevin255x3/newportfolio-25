/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ming: ['MingLiU'],
        terminal: ['Terminal'],
        inter: ['Inter'],
        botch: ['Botch'],
        forma: ["forma-djr-banner", "sans-serif"],
        artbold: ["articulat-cf", "sans-serif"],
        helvetica: ['HelveticaNeue'],

      },
      colors: {
        'americanblue': '#12127d',
        'americanbluelight': '#201b97',
        'americanred': '#b20000',
        'purple': '#ad00b1',
        'lime': '#8ddc3f',
        'royal': '#2d3ad5',
        'ooo': '#f09210',
        'eee': '#F2F2F2',
        'gw': '#F8F8FF',
      },
    },
    plugins: [
      require('@tailwindcss/aspect-ratio'),
    ],
  },
}