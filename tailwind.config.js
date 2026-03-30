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
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        ring: 'hsl(var(--ring))',
        // 华为大屏配色 - 使用 CSS 变量
        'occ-dark': 'hsl(var(--occ-dark))',
        'occ-darker': 'hsl(var(--occ-darker))',
        'occ-card': 'hsl(var(--occ-card))',
        'occ-card-light': 'hsl(var(--occ-card-light))',
        'occ-cyan': 'hsl(var(--occ-cyan))',
        'occ-blue': 'hsl(var(--occ-blue))',
        'occ-purple': 'hsl(var(--occ-purple))',
        'occ-green': 'hsl(var(--occ-green))',
        'occ-orange': 'hsl(var(--occ-orange))',
        'occ-border': 'hsl(var(--occ-border))',
        // 语义化颜色
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        error: {
          DEFAULT: 'hsl(var(--error))',
          foreground: 'hsl(var(--error-foreground))',
        },
        info: {
          DEFAULT: 'hsl(var(--info))',
          foreground: 'hsl(var(--info-foreground))',
        },
        // 渐变背景
        'gradient-start': 'hsl(var(--gradient-start))',
        'gradient-end': 'hsl(var(--gradient-end))',
      },
    },
  },
  plugins: [],
}
