import flowbitePlugin from "flowbite/plugin";

/** @type {import('tailwindcss').Config} */
export const content = [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./node_modules/flowbite-react/**/*.js",
];
export const theme = {
  extend: {
    backgroundImage: {
      "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
    },
    fontFamily: {
      "conthrax-heavy": ["var(--font-conthrax-heavy)", "sans-serif"],
      "conthrax-bold": ["var(--font-conthrax-bold)", "sans-serif"],
      "gotham-bold": ["var(--font-gotham-bold)", "sans-serif"],
      "gotham-book": ["var(--font-gotham-book)", "sans-serif"],
    },
    fontWeight: {
      heading: "700",
      "paragraph-bold": "600",
      paragraph: "400",
    },
    fontSize: {
      xxs: "0.66em",
      xs: "0.75em",
      sm: "0.875em",
      normal: "1.125em",
      lg: "1.125em",
      "2xl": "1.5em",
      "3xl": "1.875em",
      "4xl": "2.25em",
      title: "4em",
    },
    backgroundColor: {
      "blue-dark": "rgb(0, 23, 40)",
      blue: "rgb(4, 104, 177)",
      "gray-dark": "rgba(35, 31, 32, 0.5)",
    },
    borderColor: {
      blue: "rgb(4, 104, 177)",
      "blue-light": "rgb(74, 172, 193)",
      white: "rgb(229, 231, 235)",
    },
    colors: {
      blue: "rgb(4, 104, 177)",
      green: "rgb(71, 184, 104)",
      black: "rgba(0, 0, 0, 0.8)",
      "gray-light": "rgb(156, 163, 175)",
    },
    boxShadow: {
      "outer-white": "0 0 6px 6px rgba(255, 255, 255, 0.4)",
    },
  },
};
export const plugins = [flowbitePlugin];
