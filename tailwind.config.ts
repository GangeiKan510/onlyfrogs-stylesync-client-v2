module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: "#939393",
        "light-gray": "#F3F3F3",
        red: "#FE3B3B",
        tertiary: "#7AB2B2",
        "bg-primary": "#FFFFFF",
        "bg-secondary": "#F3F3F3",
        "bg-tertiary": "#7AB2B2",
        "text-primary": "#000000",
        "text-secondary": "#939393",
        "text-tertiary": "#7AB3B3",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        logo: ["Judson", "sans-serif"],
      },
      fontSize: {
        base: "16px",
      },
    },
  },
  plugins: [],
};
