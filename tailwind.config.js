/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				primary: "#12b848",
			},
			container: {
				screens: {
					lg: "1024px",
				},
				padding: {
					DEFAULT: "1.5rem",
					sm: "2rem",
					lg: "2.25rem",
				},
			},
		},
	},
	plugins: [],
};
