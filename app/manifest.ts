import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Mira's World™ App",
		short_name: "Mira's App",
		description: "Mira's World™, The app that is all about tech!",
		start_url: '/',
		display: 'standalone',
		background_color: '#000000',
		theme_color: '#ffffff',
		icons: [
			{
				src: '/icon-192x192.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: '/icon-512x512.png',
				sizes: '512x512',
				type: 'image/png',
			},
		],
	}
}