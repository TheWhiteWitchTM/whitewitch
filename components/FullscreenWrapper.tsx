"use client"

import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import { type ReactNode, useEffect } from "react"

interface FullscreenWrapperProps {
	children: ReactNode
	open: boolean                     // ← controlled from parent (your layout or page)
	onOpenChange?: (open: boolean) => void
	header?: ReactNode
	footer?: ReactNode
	showCloseButton?: boolean         // default true
}

export function FullscreenWrapper({
	                                  children,
	                                  open,
	                                  onOpenChange,
	                                  header,
	                                  footer,
	                                  showCloseButton = true,
                                  }: FullscreenWrapperProps) {
	const router = useRouter()

	// Close on Esc key
	useEffect(() => {
		if (!open) return

		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				e.preventDefault()
				handleClose()
			}
		}

		window.addEventListener("keydown", handleEsc)
		return () => window.removeEventListener("keydown", handleEsc)
	}, [open])

	const handleClose = () => {
		onOpenChange?.(false)
		router.back()           // ← returns to the page that opened it
	}

	if (!open) return null

	return (
		<>
		<div className={"absolute top-0 right-0 z-[9999]"}>
			❌
		</div>
			<div className={"fixed inset-0 z-[2000]"}>
				{children}
			</div>
		</>
	)
}