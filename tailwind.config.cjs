/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'media',
	theme: {
		fontFamily: {
			base: ['"Jost"', 'Helvetica'],
		},
		extend: {},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: ['corporate'],
	},
};
