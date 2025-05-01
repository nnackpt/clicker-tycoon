/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'float': 'float 1s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 }, 
                },
                float: {
                    '0%': {
                        opacity: 1,
                        transform: 'translate(-50%, -50%) translateY(0)',
                    },
                    '100%': {
                        opacity: 0,
                        transform: 'translate(-50%, -50%) translateY(-40px)',
                    },
                },
            },
        },
    },
    plugins: [],
};