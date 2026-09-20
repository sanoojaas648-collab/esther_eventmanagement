export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#D1A451",
        "gold-light": "#FFD700",
        "bg-primary": "#000000",
        "bg-secondary": "#0A0A0A",
        "bg-card": "#111111",
      },
      fontFamily: {
        cormorant: ["Cormorant Garamond", "serif"],
        bodoni: ["Bodoni Moda", "serif"],
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
