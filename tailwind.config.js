/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                serif: ['Noto Serif', 'serif'],
                sans: ['Noto Sans', 'sans-serif'],
            },
            colors: {
                walnut: '#2C1B14',
                'walnut-light': '#3D2B1F',
                cream: '#FDFBF7',
                gold: '#A68B5A',
            },
        },
    },
    plugins: [],
}
