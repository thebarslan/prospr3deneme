/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      extend: {
         colors: {
            "primary1": "#3A0088",
            "primary2": "#5000BB",
            "secondary1": "#EAD9FF",
            "secondary2": "#CEA7FE",
            "secondary3": "#B275FD",
            "grayBg": "#212121"
         },
      },
   },
   plugins: [],
};
