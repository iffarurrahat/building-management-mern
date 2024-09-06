/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8c52ff",
        secondary: "#ddd",
      },
      fontFamily: {
        roboto: "Roboto, sans-serif",
      },
      boxShadow: {
        "3xl": "-20px -20px 0 0 rgba(52, 58, 64, 0.2)",
      },
    },
  },
  plugins: [],
};

//
