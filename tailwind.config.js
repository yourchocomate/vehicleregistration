/** @type {import('tailwindcss').Config} */

import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "blob-scene-pc": "url('/src/assets/blob-scene-pc.svg')",
        "blob-scene-mobile": "url('/src/assets/blob-scene-mobile.svg')",
      }
    },
  },
  plugins: [],
});

