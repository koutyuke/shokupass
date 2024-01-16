/* eslint-disable import/no-extraneous-dependencies */
import { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin.js";

const baseConfig: Config = {
  mode: "jit",
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    screens: {
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mPlusRounded1c: ["var(--font-m-plus-rounded-1c)", "sans-serif"],
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-hidden": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      };
      addUtilities(newUtilities);
    }),
  ],
};

export { baseConfig };
