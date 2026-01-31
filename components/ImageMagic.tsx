// components/ImageMagic.tsx
'use client'

import { useState, useRef } from 'react'
import { removeBackground } from '@imgly/background-removal'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Upload, Eraser, Maximize2, RefreshCw, Download, Archive } from 'lucide-react'
import JSZip from 'jszip'

// Named export
export const ImageMagic = () => {
	const fileInputRef = useRef<HTMLInputElement>(null)
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const [previewSrc, setPreviewSrc] = useState<string | null>(null)
	const [originalSrc, setOriginalSrc] = useState<string | null>(null)
	const [uploading, setUploading] = useState(false)
	const [processing, setProcessing] = useState(false)
	const [progress, setProgress] = useState(0)
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
	const [selectedSize, setSelectedSize] = useState('original')

	const drawImage = (src: string, width: number, height: number) => {
		const canvas = canvasRef.current
		if (!canvas) return

		canvas.width = width
		canvas.height = height
		const ctx = canvas.getContext('2d')
		if (!ctx) return

		const img = new window.Image()
		img.onload = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			ctx.drawImage(img, 0, 0, width, height)
		}
		img.src = src
	}

	const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		setUploading(true)
		setProgress(0)

		const reader = new FileReader()
		reader.onload = (ev) => {
			const result = ev.target?.result as string | null
			if (!result) return

			setOriginalSrc(result)
			setPreviewSrc(result)

			const img = new window.Image()
			img.onload = () => {
				setDimensions({ width: img.width, height: img.height })
				drawImage(result, img.width, img.height)
			}
			img.src = result

			setUploading(false)
		}
		reader.readAsDataURL(file)
	}

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		const file = e.dataTransfer.files?.[0]
		if (!file || !file.type.startsWith('image/')) return

		const reader = new FileReader()
		reader.onload = (ev) => {
			const result = ev.target?.result as string | null
			if (!result) return

			setOriginalSrc(result)
			setPreviewSrc(result)

			const img = new window.Image()
			img.onload = () => {
				setDimensions({ width: img.width, height: img.height })
				drawImage(result, img.width, img.height)
			}
			img.src = result
		}
		reader.readAsDataURL(file)
	}

	const removeBackgroundHandler = async () => {
		if (!previewSrc) return

		setProcessing(true)

		try {
			const blob = await fetch(previewSrc).then(r => r.blob())
			const resultBlob = await removeBackground(blob)
			const resultUrl = URL.createObjectURL(resultBlob)

			setPreviewSrc(resultUrl)

			const img = new window.Image()
			img.onload = () => {
				setDimensions({ width: img.width, height: img.height })
				drawImage(resultUrl, img.width, img.height)
			}
			img.src = resultUrl
		} catch (err) {
			console.error('Remove BG failed', err)
		} finally {
			setProcessing(false)
		}
	}

	const handleResize = (value: string) => {
		setSelectedSize(value)

		if (value === 'original') {
			drawImage(originalSrc || '', dimensions.width, dimensions.height)
			return
		}

		const [targetWidth, targetHeight] = value.split('x').map(Number)
		const img = new window.Image()
		img.onload = () => {
			drawImage(originalSrc || '', targetWidth, targetHeight)
		}
		img.src = originalSrc || ''
	}

	const reset = () => {
		if (originalSrc) {
			setPreviewSrc(originalSrc)
			setSelectedSize('original')
			drawImage(originalSrc, dimensions.width, dimensions.height)
		}
	}

	const exportPng = () => {
		const canvas = canvasRef.current
		if (!canvas) return

		const url = canvas.toDataURL('image/png')
		const a = document.createElement('a')
		a.href = url
		a.download = 'edited-image.png'
		a.click()
	}

	const exportIconSetZip = async () => {
		if (!canvasRef.current) return

		const zip = new JSZip()
		const canvas = canvasRef.current

		const sizes = [
			{ size: 16, name: 'favicon-16x16.png' },
			{ size: 32, name: 'favicon-32x32.png' },
			{ size: 180, name: 'apple-touch-icon.png' },
			{ size: 192, name: 'icon-192x192.png' },
			{ size: 512, name: 'icon-512x512.png' },
		]

		// favicon.ico (simple 32x32)
		const icoCanvas = document.createElement('canvas')
		icoCanvas.width = 32
		icoCanvas.height = 32
		const icoCtx = icoCanvas.getContext('2d')
		if (icoCtx) {
			icoCtx.drawImage(canvas, 0, 0, 32, 32)
			const icoDataUrl = icoCanvas.toDataURL('image/png')
			const icoBlob = await fetch(icoDataUrl).then(r => r.blob())
			zip.file('favicon.ico', icoBlob)
		}

		for (const { size, name } of sizes) {
			const tempCanvas = document.createElement('canvas')
			tempCanvas.width = size
			tempCanvas.height = size
			const ctx = tempCanvas.getContext('2d')
			if (ctx) {
				ctx.drawImage(canvas, 0, 0, size, size)
				const dataUrl = tempCanvas.toDataURL('image/png')
				const blob = await fetch(dataUrl).then(r => r.blob())
				zip.file(name, blob)
			}
		}

		const content = await zip.generateAsync({ type: 'blob' })
		const url = URL.createObjectURL(content)
		const a = document.createElement('a')
		a.href = url
		a.download = 'icon-set.zip'
		a.click()
		URL.revokeObjectURL(url)
	}

	const commonSizes = [
		{ label: 'Original', value: 'original' },
		{ label: 'Web Medium (1200x800)', value: '1200x800' },
		{ label: 'Web Small (800x600)', value: '800x600' },
		{ label: 'Instagram Post (1080x1080)', value: '1080x1080' },
		{ label: 'Instagram Story (1080x1920)', value: '1080x1920' },
		{ label: 'Twitter/X (1200x675)', value: '1200x675' },
		{ label: 'YouTube Thumbnail (1280x720)', value: '1280x720' },
	]

	return (
		<div className="w-full h-screen flex flex-col bg-background text-foreground">
			{/* Top toolbar */}
			{previewSrc && (
				<div className="border-b p-3 flex items-center justify-between bg-card">
					<div className="flex items-center gap-4">
						<Button variant="outline" onClick={removeBackgroundHandler} disabled={processing} className="cursor-pointer">
							<Eraser className="h-4 w-4 mr-2" /> {processing ? 'Removing...' : 'Remove Background'}
						</Button>

						<div className="flex items-center gap-2">
							<label className="text-sm flex items-center gap-2">
								<Maximize2 className="h-4 w-4" /> Resize:
							</label>
							<Select value={selectedSize} onValueChange={handleResize}>
								<SelectTrigger className="w-[220px] cursor-pointer">
									<SelectValue placeholder="Select size" />
								</SelectTrigger>
								<SelectContent>
									{commonSizes.map((size) => (
										<SelectItem key={size.value} value={size.value}>
											{size.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>

					<Button variant="outline" onClick={reset} className="cursor-pointer">
						<RefreshCw className="h-4 w-4 mr-2" /> Reset
					</Button>
				</div>
			)}

			{/* Main preview area */}
			<div
				className="flex-1 relative flex items-center justify-center cursor-pointer"
				onClick={() => fileInputRef.current?.click()}
				onDrop={handleDrop}
				onDragOver={(e) => e.preventDefault()}
			>
				<input
					type="file"
					accept="image/*"
					ref={fileInputRef}
					onChange={handleFile}
					className="hidden"
				/>

				{uploading && (
					<div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-10">
						<div className="w-80 space-y-4">
							<p className="text-center text-white font-medium text-lg">Loading image...</p>
							<Progress value={progress} className="h-2 bg-white/20 [&>div]:bg-white" />
							<p className="text-center text-white/80 text-sm">{progress}%</p>
						</div>
					</div>
				)}

				{processing && (
					<div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-20">
						<div className="w-80 space-y-4">
							<p className="text-center text-white font-medium text-lg">Please wait - removing background...</p>
						</div>
					</div>
				)}

				{previewSrc ? (
					<canvas ref={canvasRef} className="max-w-full max-h-[90vh] border border-border" />
				) : (
					<div className="text-center space-y-4">
						<Upload className="mx-auto h-16 w-16 text-muted-foreground opacity-50" />
						<p className="text-xl font-medium">Drag & drop or click to upload an image</p>
						<p className="text-sm text-muted-foreground">JPG, PNG, GIF</p>
					</div>
				)}
			</div>

			{/* Bottom toolbar */}
			{previewSrc && (
				<div className="border-t p-3 flex items-center justify-center gap-4 bg-card">
					<Button variant="default" onClick={exportPng} className="cursor-pointer">
						<Download className="h-4 w-4 mr-2" /> Export PNG
					</Button>

					<Button variant="default" onClick={exportIconSetZip} className="cursor-pointer">
						<Archive className="h-4 w-4 mr-2" /> Export as icon set
					</Button>
				</div>
			)}
		</div>
	)
}