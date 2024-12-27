import type { Config } from 'tailwindcss'

export default {
	content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					'Inter',
					'ui-sans-serif',
					'system-ui',
					'sans-serif',
					'Apple Color Emoji',
					'Segoe UI Emoji',
					'Segoe UI Symbol',
					'Noto Color Emoji',
				],
			},
			colors: {
				primaryBlack: {
					default: '#202020',
					light: '#333533',
				},
				primaryYellow: {
					default: '#FFD100',
					light: '#FFEE32',
				},
				primaryWhite: {
					default: '#D6D6D6',
				},
			},
			backgroundImage: {
				'login-image': "url('/images/loginBackground.jpg')",
				'dark-gradient': 'linear-gradient(to bottom right, #1A1A1A, #0D0D0D)', // Negro claro a negro oscuro
			},
		},
	},
	plugins: [],
} satisfies Config
