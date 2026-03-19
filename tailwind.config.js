/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // 华为大屏配色
        'occ-dark': '#0B1120',
        'occ-darker': '#0A1629',
        'occ-card': '#0F2940',
        'occ-card-light': '#163A5A',
        'occ-cyan': '#00D9FF',
        'occ-blue': '#3B82F6',
        'occ-purple': '#8B5CF6',
        'occ-green': '#10B981',
        'occ-orange': '#F59E0B',
        'occ-border': '#1E40AF',
      },
    },
  },
  plugins: [],
}