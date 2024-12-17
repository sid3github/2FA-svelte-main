/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'primary-blue': '#b9dff9',
				'primary-white': '#f7f8fb',
				'primary-black': '#0d0d0d',
				'primary-grey': '#9ba2aa'
			}
		}
	},
	plugins: []
};
