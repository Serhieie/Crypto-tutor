/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}", "./components/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        shadowBox: "rgb(173, 124, 39)",
        lightPartsColor: "lightgoldenrodyellow",
        darkFont: "rgb(114, 76, 9)",
      },

      screens: {
        "2xl": { max: "1535px" },
        xl: { max: "1279px" },
        lg: { max: "1023px" },
        md: { max: "767px" },
        sm: { max: "639px" },
        ssm2: { max: "550px" },
        ssm: { max: "375px" },
        sm2: { min: "640px", max: "767px" },
        md2: { min: "768px", max: "1023px" },
        md3: { min: "768px" },
        mmd2: { min: "900px", max: "1265px" },
        lg2: { min: "1024px", max: "1335px" },
        xl2: { min: "1280px", max: "1535px" },
        "1xl2": { min: "1265px" },
        "2xl2": { min: "1536px" },
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
