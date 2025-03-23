/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      danger: "var(--color-danger)",
      "danger-foreground": "var(--color-danger-foreground)",
      warning: "var(--color-warning)",
      "warning-foreground": "var(--color-warning-foreground)",
      info: "var(--color-info)",
      "info-foreground": "var(--color-info-foreground)",
      success: "var(--color-success)",
      "success-foreground": "var(--color-success-foreground)",

      primary: {
        150: "var(--primary-150)",
        "150-foreground": "var(--primary-150-foreground)",
        125: "var(--primary-125)",
        "125-foreground": "var(--primary-125-foreground)",
        75: "var(--primary-75)",
        "75-foreground": "var(--primary-75-foreground)",
        50: "var(--primary-50)",
        "50-foreground": "var(--primary-50-foreground)",
        25: "var(--primary-25)",
        "25-foreground": "var(--primary-25-foreground)",
      },

      secondary: {
        150: "var(--secondary-150)",
        "150-foreground": "var(--secondary-150-foreground)",
        125: "var(--secondary-125)",
        "125-foreground": "var(--secondary-125-foreground)",
        100: "var(--secondary-100)",
        "100-foreground": "var(--secondary-100-foreground)",
        75: "var(--secondary-75)",
        "75-foreground": "var(--secondary-75-foreground)",
        50: "var(--secondary-50)",
        "50-foreground": "var(--secondary-50-foreground)",
        25: "var(--secondary-25)",
        "25-foreground": "var(--secondary-25-foreground)",
      },
    },
  },
  plugins: [],
};
