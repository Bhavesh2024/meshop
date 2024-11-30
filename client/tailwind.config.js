/** @type {import('tailwindcss').Config} */
export default {
	darkMode:'media',
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			screens: {
				xs: "340px",
			},
			height: {
				"70vh": "70vh",
				"60vh": "60vh",
			},
		},
	},
	plugins: [
		function ({ addUtilities }) {
			addUtilities({
				".scrollbar-none": {
					"scrollbar-width": "none" /* Firefox */,
					"-ms-overflow-style": "none" /* IE and Edge */,
				},
				".scrollbar-none::-webkit-scrollbar": {
					display: "none" /* Chrome, Safari, and Opera */,
				},
			});
		},
	],
};
