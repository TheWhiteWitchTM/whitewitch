// app/lib/metadata.ts
import type { Metadata } from 'next'

const siteUrl = 'https://mirasworld.sociallydead.me'
const siteName = "Mira's World"
const defaultTitle = "Mira's World – Open Source & Dev Blog"
const defaultDescription = 'Open-source projects, code experiments, libraries, tools, and blog posts from Mira — a software developer sharing real-world code and thoughts.'

export const baseMetadata: Metadata = {
	// Core
	metadataBase: new URL(siteUrl),
	title: {
		default: defaultTitle,
		template: `%s | ${siteName}`,
	},
	description: defaultDescription,

	// Keywords / authors
	keywords: [
		'open source',
		'github',
		'software development',
		'typescript',
		'next.js',
		'react',
		'programming',
		'blog',
		'dev tools',
		'code',
	],
	authors: [{ name: 'Mira', url: siteUrl }],
	creator: 'Mira',

	// Open Graph
	openGraph: {
		title: defaultTitle,
		description: defaultDescription,
		url: siteUrl,
		siteName,
		images: [
			{
				url: '/banner.jpg',
				alt: "Mira's World – Open Source Projects & Blog",
			},
		],
		locale: 'en_US',
		type: 'website',
	},

	// Twitter / X Cards
	twitter: {
		card: 'summary_large_image',
		title: defaultTitle,
		description: defaultDescription,
		site: '@TheWhiteWitchTM',      // ← your actual handle, change if you prefer
		creator: '@TheWhiteWitchTM',
		images: ['/banner.jpg'],
	},

	// ────────────────────────────────────────────────
	//          F A V I C O N   &   I C O N S
	// ────────────────────────────────────────────────
	icons: {
		icon: [
			// Primary favicon: your SVG file
			{ url: '/icon.svg', type: 'image/svg+xml' },
			'/favicon.svg',
		],
		// Apple Touch Icon for iOS home screen / bookmarks (add the file in public/)
		apple: '/apple-touch-icon.png',

		// Optional: Safari pinned tab (SVG works here too)
		other: [
			{
				rel: 'mask-icon',
				url: '/icon.svg',
				color: '#000000',   // neutral black, or change to your brand color
			},
		],
	},

	// Extras
	alternates: {
		canonical: siteUrl,
	},
	robots: {
		index: true,
		follow: true,
	},
}