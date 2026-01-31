// components/Weather.tsx
"use client"

import { useState, useEffect } from "react"

export function Weather() {
	const [weather, setWeather] = useState<{ temp: number | null; icon: string }>({
		temp: null,
		icon: "⏳"
	})

	const fetchWeather = async () => {
		try {
			const res = await fetch(
				"https://api.open-meteo.com/v1/forecast?latitude=49.9929&longitude=8.2473&current_weather=true&timezone=Europe/Berlin"
			)
			const data = await res.json()
			const temp = data.current_weather.temperature
			const code = data.current_weather.weathercode

			let icon = "☀️"
			if (code >= 1 && code <= 3) icon = "☁️"
			else if (code >= 45 && code <= 48) icon = "🌫️"
			else if (code >= 51 && code <= 67) icon = "🌧️"
			else if (code >= 71 && code <= 86) icon = "❄️"
			else if (code >= 95 && code <= 99) icon = "⚡"

			setWeather({ temp, icon })
		} catch {
			setWeather({ temp: null, icon: "❌" })
		}
	}

	useEffect(() => {
		fetchWeather()
		const interval = setInterval(fetchWeather, 600000)
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
			title="Weather in Mainz, Germany"
		>
			<span className="text-green-700">{weather.icon}</span>
			<span className={"!-mt-1"}>
        {weather.temp !== null ? `${Math.round(weather.temp)}°C` : "--"}
      </span>
			<span>Mainz</span>
		</div>
	)
}