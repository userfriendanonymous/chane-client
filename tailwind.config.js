/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,tsx,jsx}'
    ],
    theme: {
        fontSize: {
            sSub: '0.8rem',
            sBlock: '1.2rem'
        },

        gap: {
            widget: '0.9rem',
            block: '0.6rem',
            sub: '0.4rem',
            detail: '0.1rem',
        },

        padding: {
            widget: '0.9rem',
            block: '0.6rem',
            sub: '0.5rem',
            detail: '0.1rem',
        },

        borderRadius: {
            section: '1rem',
            widget: '0.9rem',
            block: '0.6rem',
            sub: '0.5rem',
            detail: '0.1rem',
            full: '9999px'
        },

        extend: {},
    },
    plugins: [],
}
