"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

// Common arrow / direction / pointer symbols (Unicode)
// You can easily extend this list
const symbols = [
	{ char: "↑", name: "up arrow" },
	{ char: "↓", name: "down arrow" },
	{ char: "←", name: "left arrow" },
	{ char: "→", name: "right arrow" },
	{ char: "↖", name: "up-left arrow" },
	{ char: "↗", name: "up-right arrow" },
	{ char: "↙", name: "down-left arrow" },
	{ char: "↘", name: "down-right arrow" },
	{ char: "↔", name: "left-right arrow" },
	{ char: "↕", name: "up-down arrow" },
	{ char: "↩", name: "leftwards arrow with hook" },
	{ char: "↪", name: "rightwards arrow with hook" },
	{ char: "⤴", name: "arrow pointing rightwards then curving upwards" },
	{ char: "⤵", name: "arrow pointing rightwards then curving downwards" },
	{ char: "⇅", name: "upwards arrow leftwards of downwards arrow" },
	{ char: "⇆", name: "leftwards arrow rightwards of upwards arrow" },
	{ char: "⇇", name: "leftwards triple arrow" },
	{ char: "⇈", name: "upwards triple arrow" },
	{ char: "⇉", name: "rightwards triple arrow" },
	{ char: "⇊", name: "downwards triple arrow" },
	{ char: "⇍", name: "leftwards arrow with double stroke" },
	{ char: "⇎", name: "left right arrow with double stroke" },
	{ char: "⇏", name: "rightwards arrow with double stroke" },
	{ char: "⇡", name: "upwards dashed arrow" },
	{ char: "⇣", name: "downwards dashed arrow" },
	{ char: "⇠", name: "leftwards dashed arrow" },
	{ char: "⇢", name: "rightwards dashed arrow" },
	{ char: "⇤", name: "leftwards arrow to bar" },
	{ char: "⇥", name: "rightwards arrow to bar" },
	{ char: "↞", name: "leftwards two headed arrow" },
	{ char: "↠", name: "rightwards two headed arrow" },
	{ char: "↟", name: "upwards two headed arrow" },
	{ char: "↡", name: "downwards two headed arrow" },
	{ char: "↢", name: "leftwards arrow with tail" },
	{ char: "↣", name: "rightwards arrow with tail" },
	{ char: "⇱", name: "north west arrow to corner" },
	{ char: "⇲", name: "south east arrow to corner" },
	{ char: "⤴︎", name: "arrow right curving up (variation)" },
	{ char: "⤵︎", name: "arrow right curving down (variation)" },
	{ char: "➔", name: "rightwards arrow" },
	{ char: "→", name: "right arrow (thick)" },
	{ char: "➜", name: "rightwards arrow with stroke" },
	{ char: "➡", name: "rightwards black arrow" },
	{ char: "↱", name: "arrow pointing rightwards then curving downwards" },
	{ char: "↲", name: "downwards arrow with tip leftwards" },
	{ char: "↳", name: "downwards arrow with tip rightwards" },
	{ char: "⤶", name: "arrow pointing downwards then curving leftwards" },
	{ char: "⤷", name: "arrow pointing downwards then curving rightwards" },
	{ char: "↯", name: "downwards zigzag arrow" },
	{ char: "↰", name: "upwards arrow with tip leftwards" },
	{ char: "↴", name: "rightwards arrow with corner downwards" },
	{ char: "↵", name: "downwards arrow with corner leftwards (enter)" },
	{ char: "↶", name: "anticlockwise top semicircle arrow" },
	{ char: "↷", name: "clockwise top semicircle arrow" },
	{ char: "↺", name: "anticlockwise open circle arrow" },
	{ char: "↻", name: "clockwise open circle arrow" },
	{ char: "⇄", name: "rightwards arrow over leftwards arrow" },
	{ char: "⇅", name: "upwards arrow leftwards of downwards arrow" },
	{ char: "⇆", name: "leftwards arrow rightwards of upwards arrow" },
	{ char: "⇇", name: "leftwards triple arrow" },
	{ char: "⇈", name: "upwards triple arrow" },
	{ char: "⇉", name: "rightwards triple arrow" },
	{ char: "⇊", name: "downwards triple arrow" },
	{ char: "⇋", name: "leftwards wave arrow" },
	{ char: "⇌", name: "rightwards wave arrow" },
]

function findSymbol(term: string): string {
	if (!term.trim()) return ""

	const clean = term.toLowerCase().trim()

	for (const item of symbols) {
		if (
			item.name.toLowerCase().includes(clean) ||
			item.char === clean ||
			item.name.toLowerCase().replace(/\s+/g, "").includes(clean.replace(/\s+/g, ""))
		) {
			return item.char
		}
	}

	return "?"
}

export function WebfontBuilder() {
	const [search, setSearch] = useState("")

	// Split on spaces (commas are ignored / treated as space)
	const terms = search
		.replace(/,/g, " ")
		.split(/\s+/)
		.map(t => t.trim())
		.filter(Boolean)

	const built = terms.map(findSymbol).join("")

	const handleCopy = (text: string, label = "Copied to clipboard") => {
		navigator.clipboard.writeText(text).then(() => {
			toast.success("Copied!", {
				description: label,
				duration: 1800,
			})
		})
	}

	return (
		<Card className="w-full max-w-4xl mx-auto">
			<CardHeader>
				<CardTitle>Webfont Symbols Builder</CardTitle>
				<CardDescription>
					Type keywords (e.g. <code>up down left right double circle arrow</code>) — separate with spaces.
					<br />
					Example: <code>up down left right double arrow circle</code> or <code>arrow up thick right</code>
					<br />
					Click any symbol to copy it. The search bar builds a sequence from your keywords.
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-6">
				<Input
					placeholder="up down left right double arrow circle"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="w-full"
				/>

				{search.trim() && (
					<div className="flex items-center gap-4 flex-wrap">
						<span className="text-lg font-medium whitespace-nowrap">Result:</span>
						<div className="text-5xl min-h-[1.2em]">{built || "?"}</div>
						{built && (
							<Button
								variant="outline"
								size="sm"
								onClick={() => handleCopy(built, "Symbol sequence copied")}
							>
								Copy
							</Button>
						)}
					</div>
				)}

				<div className="max-h-[540px] overflow-y-auto border rounded-lg p-5 bg-background/50">
					<div>
						<h3 className="text-2xl font-bold mb-4">
							Arrow & Direction Symbols ({symbols.length})
						</h3>

						<div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-14 xl:grid-cols-16 gap-2">
							{symbols.map((item, i) => (
								<button
									key={i}
									type="button"
									className="text-3xl hover:scale-110 transition-all duration-150 p-2 rounded-md hover:bg-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/40 flex items-center justify-center border border-transparent hover:border-border/40"
									onClick={() => handleCopy(item.char, item.name)}
									title={item.name}
								>
									{item.char}
								</button>
							))}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}