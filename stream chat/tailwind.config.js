/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "16/9": "16 / 9",
        "21/9": "21 / 9",
        "16/10": "16 / 10",
        "21/10": "21 / 10",
        "16/11": "16 / 11",
        "21/11": "21 / 11",
        "16/12": "16 / 12",
        "21/12": "21 / 12",
        "16/13": "16 / 13",
        "21/13": "21 / 13",
        "20/9": "20 / 9",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("daisyui")],
  daisyui: {
    themes: [],
  },
};
