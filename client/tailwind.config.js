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
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "#7B7B7B",
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#424242",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#7B7B7B",
            borderRadius: "9999px",
            border: "1px solid transparent",
          },
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
