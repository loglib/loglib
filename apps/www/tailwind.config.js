const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./ui/**/*.{ts,tsx}",
        "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: ["class"],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            tremor: {
                brand: {
                    faint: "#eff6ff", // blue-50
                    muted: "#bfdbfe", // blue-200
                    subtle: "#60a5fa", // blue-400
                    DEFAULT: "#3b82f6", // blue-500
                    emphasis: "#1d4ed8", // blue-700
                    inverted: "#ffffff", // white
                },
                background: {
                    muted: "#f9fafb", // gray-50
                    subtle: "#f3f4f6", // gray-100
                    DEFAULT: "#ffffff", // white
                    emphasis: "#374151", // gray-700
                },
                border: {
                    DEFAULT: "#e5e7eb", // gray-200
                },
                ring: {
                    DEFAULT: "#e5e7eb", // gray-200
                },
                content: {
                    subtle: "#9ca3af", // gray-400
                    DEFAULT: "#6b7280", // gray-500
                    emphasis: "#374151", // gray-700
                    strong: "#111827", // gray-900
                    inverted: "#ffffff", // white
                },
            },
            // dark mode
            "dark-tremor": {
                brand: {
                    faint: "#0B1229", // custom
                    muted: "#172554", // blue-950
                    subtle: "#1e40af", // blue-800
                    DEFAULT: "#3b82f6", // blue-500
                    emphasis: "#60a5fa", // blue-400
                    inverted: "#030712", // gray-950
                },
                background: {
                    muted: "#131A2B", // custom
                    subtle: "#1f2937", // gray-800
                    DEFAULT: "#111827", // gray-900
                    emphasis: "#d1d5db", // gray-300
                },
                border: {
                    DEFAULT: "#1f2937", // gray-800
                },
                ring: {
                    DEFAULT: "#1f2937", // gray-800
                },
                content: {
                    subtle: "#4b5563", // gray-600
                    DEFAULT: "#6b7280", // gray-600
                    emphasis: "#e5e7eb", // gray-200
                    strong: "#f9fafb", // gray-50
                    inverted: "#000000", // black
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "gradient-circle":
                    "radial-gradient(circle, var(--tw-gradient-stops), transparent 90%)",
            },
            colors: {
                brand: {
                    50: "#fffbe7",
                    100: "#fff5c1",
                    200: "#ffe885",
                    300: "#ffd240",
                    400: "#ffb90c",
                    500: "#f3a000",
                    600: "#d27800",
                    700: "#a75201",
                    800: "#8a4009",
                    900: "#75350e",
                    950: "#130701",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                logo: "#F9A858",
                emphasis: "#F9A858",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },

            fontFamily: {
                sans: ["var(--font-satoshi)", ...fontFamily.sans],
                heading: ["var(--font-heading)", ...fontFamily.sans],
            },
            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
                typing: {
                    from: { width: "0" },
                    to: { width: "24ch" },
                },
                blink: {
                    from: { "border-right-color": "transparent" },
                    to: { "border-right-color": "black" },
                },
                text: {
                    "0%, 100%": {
                        "background-size": "200% 200%",
                        "background-position": "0% center",
                    },
                    "50%": {
                        "background-size": "200% 200%",
                        "background-position": "100% center",
                    },
                },
                border: {
                    "0%, 100%": {
                        transform: "translateX(0)",
                    },
                    "50%": {
                        transform: "translateX(50px)",
                    },
                    "70%": {
                        transform: "translateX(100px)",
                    },
                    "80%": {
                        transform: "translateX(400px)",
                    },
                    "100%": {
                        transform: "translateX(600px)",
                    },
                },

                "background-pan": {
                    from: {
                        "background-position": "0% center",
                    },
                    to: {
                        "background-position": "-200% center",
                    },
                },
                "spin-slow": {
                    from: {
                        "transform-origin": "center center",
                        transform: "rotate(0deg)",
                    },
                    to: {
                        "transform-origin": "center center",
                        transform: "rotate(360deg)",
                    },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                typing: "typing 2s steps(14), blink 0.1s infinite",
                text: "text 6s linear infinite",
                border: "border 30s ease infinite -2s",
                "background-pan": "background-pan 3s linear infinite",
                "spin-slow": "spin-slow 10s linear infinite",
            },
            boxShadow: {
                // light
                "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
                "tremor-card": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
                "tremor-dropdown":
                    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                // dark
                "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
                "dark-tremor-card": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
                "dark-tremor-dropdown":
                    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            },
            borderRadius: {
                "tremor-small": "0.375rem",
                "tremor-default": "0.5rem",
                "tremor-full": "9999px",
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontSize: {
                "tremor-label": ["0.75rem"],
                "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
                "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
                "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
            },
        },
    },
    safelist: [
        {
            pattern:
                /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
            variants: ["hover", "ui-selected"],
        },
        {
            pattern:
                /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
            variants: ["hover", "ui-selected"],
        },
        {
            pattern:
                /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
            variants: ["hover", "ui-selected"],
        },
        {
            pattern:
                /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
        },
        {
            pattern:
                /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
        },
        {
            pattern:
                /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
        },
    ],
    plugins: [
        // @ts-ignore
        require("tailwindcss-animate"),
        require("@tailwindcss/typography"),
        require("@tailwindcss/container-queries"),
        require("@headlessui/tailwindcss"),
    ],
};
