module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#04A032',
        secondary: '#4CED7C',
        tertiary: '#026E22',
        border: '#8B8B8B',
        text: '#A9A9A9',
        inputSearch: '#E5E5E5',
      },
      backgroundImage: () => ({
        background: "url('/img/background.png')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
