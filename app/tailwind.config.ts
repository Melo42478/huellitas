import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FBF4E8",
        surface: "#FFFDF8",
        text: {
          DEFAULT: "#4A3B33",
          secondary: "#6f5f52",
          secondary2: "#5f5045",
          muted: "#8A7A6E",
        },
        border: {
          DEFAULT: "#ece0cb",
          strong: "#e0d3bf",
        },
        teal: {
          DEFAULT: "#16808A",
          dark: "#0F6068",
          soft: "#E4F2F1",
        },
        pink: "#EF9BB4",
        green: {
          DEFAULT: "#6FA84E",
          soft: "#EDF5F0",
        },
        orange: {
          DEFAULT: "#E39A4E",
          light: "#F0A95C",
          dark: "#D98A57",
        },
        purple: {
          DEFAULT: "#B394D4",
          dark: "#8467a8",
          soft: "#efe7f6",
        },
        blue: "#7FA6D6",
        red: {
          DEFAULT: "#c9463f",
          light: "#d9534f",
          soft: "#fbe4e2",
        },
        lime: "#9FC26B",
        footer: {
          bg: "#16808A",
          link: "#d7efee",
        },
        status: {
          adopcion: "#16808A",
          tratamiento: "#E39A4E",
          adoptado: "#6FA84E",
        },
      },
      fontFamily: {
        display: ["var(--font-baloo)", "cursive"],
        body: ["var(--font-nunito)", "sans-serif"],
      },
      borderRadius: {
        card: "22px",
        "card-lg": "26px",
        row: "16px",
        input: "12px",
        pill: "999px",
      },
      boxShadow: {
        card: "0 6px 18px rgba(74,59,51,.06)",
        "card-hover": "0 14px 30px rgba(74,59,51,.12)",
        flip: "0 26px 48px rgba(74,59,51,.28)",
        toast: "0 10px 26px rgba(0,0,0,.2)",
      },
      maxWidth: {
        content: "1180px",
      },
      screens: {
        xs: "460px",
        sm2: "620px",
        md2: "860px",
      },
      animation: {
        floaty: "floaty 5s ease-in-out infinite",
        fadeUp: "fadeUp 0.45s ease",
        reveal: "reveal 0.6s cubic-bezier(0.2, 0.7, 0.3, 1)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        reveal: {
          "0%": { opacity: "0", transform: "translateY(26px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
