/** @type {import('tailwindcss').Config} */
export const content = [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
];
export const theme = {
    extend: {
        colors: {
            main: 'var(--main)',
            text: 'var(--text)',
            bold: 'var(--bold)',
            neutral: 'var(--neutral)',
            dark: 'var(--dark)',
        },
    },
};
export const plugins = [];
