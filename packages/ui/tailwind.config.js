/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                "gradient-primary": "radial-gradient(162.05% 170% at 109.58% 35%, #667593 0%, #E3E3E3 100%)",
            },
            fontFamily: {
                neu: ['Neue Haas Grotesk Display Pro'],
                helveticaNeue: 'var(--font-helveticaNeue)'
            },
            colors: {
                'default': "#252527",
                'emphasis': "#F9A858",
                'subtle': "#EFEDEB",
                'error': '#ED0000',
                'muted': '#B4B4B4',
                'white': '#ffffff',
                'success': '#E2FBE8',
                'attention': '#FCEED8',
                'info': '#DEE9FC'
            },
        },
    },
    plugins: [],
}
