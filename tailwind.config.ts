import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // colors: {
    //   'dark': '#2B2D42',
    //   'gray': '#8D99AE',
    //   'white': '#EDF2F4',
    //   'red': '#EF233C',
    //   'blue': '#04D9D9'
    // },
    extend: {
      spacing: {
        "128": "32rem",
        "144": "36rem",
        "160": "40rem",
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
