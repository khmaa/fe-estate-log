/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        surface: {
          DEFAULT: "var(--color-surface)",
          alt: "var(--color-surface-alt)",
        },
        border: "var(--color-border)",
        muted: {
          DEFAULT: "var(--color-muted)",
          foreground: "var(--color-muted-foreground)",
        },
        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "var(--color-primary-foreground)",
          hover: "var(--color-primary-hover)",
          active: "var(--color-primary-active)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          foreground: "var(--color-secondary-foreground)",
          hover: "var(--color-secondary-hover)",
        },
        info: {
          DEFAULT: "var(--color-info)",
          soft: "var(--color-info-soft)",
        },
        success: {
          DEFAULT: "var(--color-success)",
          soft: "var(--color-success-soft)",
        },
        warning: {
          DEFAULT: "var(--color-warning)",
          soft: "var(--color-warning-soft)",
        },
        danger: {
          DEFAULT: "var(--color-danger)",
          soft: "var(--color-danger-soft)",
        },
        focus: "var(--color-focus-ring)",
      },
      borderRadius: {
        ui: "var(--radius-ui)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
      },
      backgroundImage: {
        page: "var(--gradient-page)",
      },
    },
  },
};
