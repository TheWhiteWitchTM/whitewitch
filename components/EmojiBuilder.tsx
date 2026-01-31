"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"  // ← Updated import (no useToast hook)
import dataRaw from "@emoji-mart/data"

// Type the emoji-mart data structure
const data = dataRaw as {
	emojis: Record<
		string,
		{
			id: string
			name: string
			keywords: string[]
			skins: Array<{ unified: string }>
		}
	>
	categories: Array<{
		id: string
		name: string
		emojis: string[]
	}>
}

// Reliable category name mapping (emoji-mart sometimes has missing/inconsistent names)
const categoryNameMap: Record<string, string> = {
	smileys_and_emotion: "Smileys & Emotion",
	people_and_body: "People & Body",
	component: "Component",
	animals_and_nature: "Animals & Nature",
	food_and_drink: "Food & Drink",
	travel_and_places: "Travel & Places",
	activities: "Activities",
	objects: "Objects",
	symbols: "Symbols",
	flags: "Flags",
}

function getCategoryDisplayName(catId: string, fallbackName?: string): string {
	return (
		categoryNameMap[catId] ||
		fallbackName ||
		catId
			.replace(/_/g, " ")
			.split(" ")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ")
	)
}

function toEmoji(unified: string): string {
	return unified
		.split("-")
		.map((hex) => String.fromCodePoint(parseInt(hex, 16)))
		.join("")
}

function findBestWithTerms(
	terms: string[],
	preferSkins = false
): (typeof data.emojis)[string] | null {
	if (!terms.length) return null

	const allEmojis = Object.values(data.emojis)
	let maxScore = -1
	let candidates: (typeof data.emojis)[string][] = []

	for (const e of allEmojis) {
		const searchFields = [e.name.toLowerCase(), ...e.keywords.map((k) => k.toLowerCase())]
		const score = terms.filter((term) => searchFields.some((f) => f.includes(term))).length

		if (score > maxScore) {
			maxScore = score
			candidates = [e]
		} else if (score === maxScore) {
			candidates.push(e)
		}
	}

	if (!candidates.length) return null

	if (preferSkins) {
		const skinCandidate = candidates.find((e) => e.skins.length > 1)
		if (skinCandidate) return skinCandidate
	}

	return candidates[0]
}

function findEmoji(terms: string[]): string | null {
	if (!terms.length) return null

	const lowerTerms = terms.map((t) => t.toLowerCase())

	const skinMap: Record<string, number> = {
		light: 1,
		"medium-light": 2,
		medium: 3,
		"medium-dark": 4,
		dark: 5,
		black: 5,
	}

	const skinTerm = lowerTerms.find((t) => t in skinMap)
	const skinIndex = skinTerm ? skinMap[skinTerm] : 0
	const hasSkinRequest = !!skinTerm

	// Try perfect match
	const fullEmoji = findBestWithTerms(lowerTerms)
	if (fullEmoji) {
		const matchedCount = lowerTerms.filter((term) =>
			[fullEmoji.name.toLowerCase(), ...fullEmoji.keywords.map((k) => k.toLowerCase())].some((f) =>
				f.includes(term)
			)
		).length

		if (matchedCount === lowerTerms.length) {
			return toEmoji(fullEmoji.skins[0].unified)
		}
	}

	// Skin tone + base match
	if (hasSkinRequest) {
		const baseTerms = lowerTerms.filter((t) => !(t in skinMap))
		if (baseTerms.length > 0) {
			const baseEmoji = findBestWithTerms(baseTerms, true)
			if (baseEmoji && baseEmoji.skins.length > skinIndex) {
				return toEmoji(baseEmoji.skins[skinIndex].unified)
			}
		}
	}

	// Fallback to best match
	if (fullEmoji) {
		return toEmoji(fullEmoji.skins[0].unified)
	}

	return null
}

export function EmojiBuilder() {
	const [category, setCategory] = useState("all")
	const [search, setSearch] = useState("")

	const categoryOptions = [
		{ id: "all", name: "All Categories" },
		...data.categories.map((cat) => ({
			id: cat.id,
			name: getCategoryDisplayName(cat.id, cat.name),
		})),
	]

	const filteredCategories = useMemo(
		() =>
			category === "all"
				? data.categories
				: data.categories.filter((cat) => cat.id === category),
		[category]
	)

	const builtEmojis = search
		.split(",")
		.map((segment) => {
			const terms = segment.trim().split(/\s+/).filter(Boolean)
			return findEmoji(terms) || "?"
		})
		.join("")

	const handleCopy = (text: string, label = "Copied to clipboard") => {
		navigator.clipboard.writeText(text).then(() => {
			toast.success("Copied!", {  // ← Updated to Sonner API
				description: label,
				duration: 1800,
			})
		})
	}

	return (
		<Card className="w-full max-w-4xl mx-auto">
			<CardHeader>
				<CardTitle>Emoji Builder</CardTitle>
				<CardDescription>
					Type descriptions to build emoji sequences. Separate different emojis with commas.
					<br />
					Skin tones: light, medium-light, medium, medium-dark, dark, black
					<br />
					Example: woman black, sparkle, frog, smiling face heart eyes
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-6">
				<div className="flex flex-col sm:flex-row gap-4">
					<Select value={category} onValueChange={setCategory}>
						<SelectTrigger className="w-full sm:w-[240px]">
							<SelectValue placeholder="Select category..." />
						</SelectTrigger>
						<SelectContent>
							{categoryOptions.map((opt) => (
								<SelectItem key={opt.id} value={opt.id}>
									{opt.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Input
						placeholder="woman black, sparkle, frog, smiling face"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="flex-1"
					/>
				</div>

				{search.trim() && (
					<div className="flex items-center gap-4 flex-wrap">
						<span className="text-lg font-medium whitespace-nowrap">Result:</span>
						<div className="text-5xl min-h-[1.2em]">{builtEmojis || "?"}</div>
						{builtEmojis && builtEmojis !== "?" && (
							<Button
								variant="outline"
								size="sm"
								onClick={() => handleCopy(builtEmojis, "Emoji sequence copied")}
							>
								Copy
							</Button>
						)}
					</div>
				)}

				<div className="max-h-[540px] overflow-y-auto border rounded-lg p-6 bg-background/50">
					{filteredCategories.length === 0 ? (
						<p className="text-center text-muted-foreground py-12 text-lg">
							No categories found — check @emoji-mart/data installation
						</p>
					) : (
						filteredCategories.map((cat, index) => (
							<div key={cat.id}>
								<div className="flex items-center justify-between mb-4">
									<h3 className="text-2xl font-bold tracking-tight">
										{getCategoryDisplayName(cat.id, cat.name)}
										<span className="ml-2 text-muted-foreground text-lg font-normal">
                      ({cat.emojis.length})
                    </span>
									</h3>
								</div>

								<div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-14 xl:grid-cols-16 gap-3 mb-10">
									{cat.emojis.map((id) => {
										const emoji = data.emojis[id]
										if (!emoji) return null
										const char = toEmoji(emoji.skins[0].unified)
										return (
											<button
												key={id}
												type="button"
												className="text-4xl hover:scale-110 transition-all duration-150 p-3 rounded-lg hover:bg-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/40 text-center aspect-square flex items-center justify-center border border-transparent hover:border-border/40"
												onClick={() => handleCopy(char, emoji.name || "Emoji copied")}
												title={emoji.name || undefined}
											>
												{char}
											</button>
										)
									})}
								</div>

								{index < filteredCategories.length - 1 && <Separator className="my-12" />}
							</div>
						))
					)}
				</div>
			</CardContent>
		</Card>
	)
}