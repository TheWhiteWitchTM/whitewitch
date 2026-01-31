"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import dataRaw from "@emoji-mart/data"

// Type assertion — this fixes the "Property 'emojis' does not exist" error
const data = dataRaw as {
	emojis: Record<string, any>
	categories: Array<{ id: string; name: string; emojis: string[] }>
}

const countryCodes = [
	"ad", "ae", "af", "ag", "ai", "al", "am", "ao", "aq", "ar", "as", "at", "au", "aw", "ax", "az",
	"ba", "bb", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bl", "bm", "bn", "bo", "bq", "br", "bs",
	"bt", "bw", "by", "bz", "ca", "cc", "cd", "cf", "cg", "ch", "ci", "ck", "cl", "cm", "cn", "co",
	"cp", "cr", "cu", "cv", "cw", "cx", "cy", "cz", "de", "dg", "dj", "dk", "dm", "do", "dz", "ea",
	"ec", "ee", "eg", "eh", "er", "es", "et", "eu", "fi", "fj", "fk", "fm", "fo", "fr", "ga", "gb",
	"gd", "ge", "gf", "gg", "gh", "gi", "gl", "gm", "gn", "gp", "gq", "gr", "gs", "gt", "gu", "gw",
	"gy", "hk", "hm", "hn", "hr", "ht", "hu", "ic", "id", "ie", "il", "im", "in", "io", "iq", "ir",
	"is", "it", "je", "jm", "jo", "jp", "ke", "kg", "kh", "ki", "km", "kn", "kp", "kr", "kw", "ky",
	"kz", "la", "lb", "lc", "li", "lk", "lr", "ls", "lt", "lu", "lv", "ly", "ma", "mc", "md", "me",
	"mf", "mg", "mh", "mk", "ml", "mm", "mn", "mo", "mp", "mq", "mr", "ms", "mt", "mu", "mv", "mw",
	"mx", "my", "mz", "na", "nc", "ne", "nf", "ng", "ni", "nl", "no", "np", "nr", "nu", "nz", "om",
	"pa", "pe", "pf", "pg", "ph", "pk", "pl", "pm", "pn", "pr", "ps", "pt", "pw", "py", "qa", "re",
	"ro", "rs", "ru", "rw", "sa", "sb", "sc", "sd", "se", "sg", "sh", "si", "sj", "sk", "sl", "sm",
	"sn", "so", "sr", "ss", "st", "sv", "sx", "sy", "sz", "ta", "tc", "td", "tf", "tg", "th", "tj",
	"tk", "tl", "tm", "tn", "to", "tr", "tt", "tv", "tw", "tz", "ua", "ug", "um", "un", "us", "uy",
	"uz", "va", "vc", "ve", "vg", "vi", "vn", "vu", "wf", "ws", "xk", "ye", "yt", "za", "zm", "zw",
]

function codeToFlagEmoji(code: string): string {
	if (code.length !== 2) return "?"
	const offset = 0x1F1E6 // Regional Indicator A
	const a = code[0].toUpperCase().charCodeAt(0) - 65
	const b = code[1].toUpperCase().charCodeAt(0) - 65
	return String.fromCodePoint(offset + a, offset + b)
}

function findFlag(term: string): string {
	if (!term.trim()) return ""
	const clean = term.trim().toLowerCase()

	// Direct 2-letter code match
	if (clean.length === 2 && countryCodes.includes(clean)) {
		return codeToFlagEmoji(clean)
	}

	// Fallback: search in emoji-mart data by name/keywords
	for (const code of countryCodes) {
		const id = `flag_${code}`
		const e = data.emojis?.[id]
		if (!e) continue

		const searchable = [
			(e.name || "").toLowerCase(),
			...(e.keywords || []).map((k: string) => k.toLowerCase()),
			code,
		]

		if (searchable.some(s => s.includes(clean))) {
			return codeToFlagEmoji(code)
		}
	}

	return "?"
}

export function FlagBuilder() {
	const [search, setSearch] = useState("")

	// Split on spaces only (commas → space)
	const terms = search
		.replace(/,/g, " ")
		.split(/\s+/)
		.map(t => t.trim())
		.filter(Boolean)

	const builtFlags = terms.map(findFlag).join("")

	const handleCopy = (text: string, label = "Copied to clipboard") => {
		navigator.clipboard.writeText(text).then(() => {
			toast.success("Copied!", { description: label, duration: 1800 })
		})
	}

	return (
		<Card className="w-full max-w-4xl mx-auto">
			<CardHeader>
				<CardTitle>Flag Builder</CardTitle>
				<CardDescription>
					Type 2-letter country codes (e.g. <code>de</code>, <code>eu</code>, <code>us</code>) or country names (e.g. <code>germany</code>, <code>united states</code>) — separate with spaces.
					<br />
					Example: <code>eu de fr germany japan</code> or <code>EU Germany France</code>
					<br />
					Only official country, territory and special region flags (EU, UN, etc.).
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-6">
				<Input
					placeholder="eu de germany france japan"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="w-full"
				/>

				{search.trim() && (
					<div className="flex items-center gap-4 flex-wrap">
						<span className="text-lg font-medium whitespace-nowrap">Result:</span>
						<div className="text-5xl min-h-[1.2em]">{builtFlags || "?"}</div>
						{builtFlags && (
							<Button
								variant="outline"
								size="sm"
								onClick={() => handleCopy(builtFlags, "Flag sequence copied")}
							>
								Copy
							</Button>
						)}
					</div>
				)}

				<div className="max-h-[540px] overflow-y-auto border rounded-lg p-5 bg-background/50">
					<div>
						<h3 className="text-2xl font-bold mb-4">
							Country & Region Flags ({countryCodes.length})
						</h3>

						<div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-14 xl:grid-cols-16 gap-2">
							{countryCodes.map((code) => {
								const char = codeToFlagEmoji(code)
								const name = code.toUpperCase()

								return (
									<button
										key={code}
										type="button"
										className="text-3xl hover:scale-110 transition-all duration-150 p-2 rounded-md hover:bg-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/40 flex items-center justify-center border border-transparent hover:border-border/40"
										onClick={() => handleCopy(char, name)}
										title={name}
									>
										{char}
									</button>
								)
							})}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}