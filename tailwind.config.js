/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      screens: {
        max_screen: "1440px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        primary: "#109603",
        secondary: "#CB2A8A",
        primaryText: "#181A1A",
        secondaryText: "#555249",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      backgroundImage: {
        gradient: "linear-gradient(94deg, #FF1493 -24.05%, #1746FF 127.9%)",
        headerGradient:
          "linear-gradient(90deg, rgba(255, 146, 173, 0.50) -8.03%, rgba(125, 236, 255, 0.50) 112.85%)",
        noticeGradient:
          "linear-gradient(90deg, rgba(16,150,3,0.15) 0%, rgba(16,150,3,0.03) 60%, rgba(16,150,3,0) 100%)",
        footerGradient:
          "linear-gradient(180deg, #0E8703 0%, #0D0E22 100%)",
        footerBottomGradient:
          "linear-gradient(0deg, #121421, #121421),linear-gradient(180deg, #0D0E22 13.44 %, #252756 139.08 %)"

      },
      fontFamily: {
        "font-primary": ["Space Grotesk", "serif"],
        "font-secondary": ["Space Grotesk", "serif"],
      },
    },
  },
  // eslint-disable-next-line no-undef
  // plugins: [require("tailwindcss-animate")],
  plugins: [],
};
