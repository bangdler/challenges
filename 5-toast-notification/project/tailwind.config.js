/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,}"],
  theme: {
    extend: {
      colors: {
        Error: "#EF4444",
        Success: "#22C55E",
        Info: "#3B82F6",
        Warning: "#F97316",
      },
      keyframes: {
        notify: {
          "100%": { transform: "translateX(0)" },
        },
        remove: {
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        notify: "notify 0.5s linear forwards",
        remove: "remove 0.5s linear forwards",
      },
    },
  },
  plugins: [],
};
