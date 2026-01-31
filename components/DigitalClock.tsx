// components/DigitalClock.tsx
"use client"

import { useState, useEffect } from "react"

export function DigitalClock() {
	const [time, setTime] = useState("")

	useEffect(() => {
		const updateClock = () => {
			const now = new Date()
			const formatter = new Intl.DateTimeFormat("de-DE", {
				hour: "2-digit",
				minute: "2-digit",
				hour12: false,
				timeZone: "Europe/Berlin"
			})

			const parts = formatter.formatToParts(now)
			const hour = parts.find(p => p.type === "hour")?.value ?? "00"
			const minute = parts.find(p => p.type === "minute")?.value ?? "00"

			setTime(`${hour}:${minute}`)
		}

		updateClock()
		const interval = setInterval(updateClock, 1000)
		return () => clearInterval(interval)
	}, [])

	return (
		<div
			className="
        font-clock
        text-sm
        tracking-[0.08em]
        text-green-400
        font-medium
        tabular-nums
        opacity-90
        select-none
        flex items-center gap-1.5
        drop-shadow-[0_0_3px_rgba(220,38,38,0.6)]
      "
			title="German time (Europe/Berlin)"
		>
			<span className="text-green-400">🕒</span>
			<span>{time || "••:••"}</span>
		</div>
	)
}