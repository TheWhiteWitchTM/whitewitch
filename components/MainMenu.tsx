'use client';

// @/next-static/legacy/MainMenu.tsx

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

import {
	Home,
	Newspaper,
	LayoutDashboard,
	Wrench,
	Flag,
	Smile,
	Lightbulb,
	Text,
	PaintbrushIcon,
	Wind,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────

interface SubItem {
	type?: "separator";
	label?: string;
	href?: string;
	icon?: typeof Home;
	shortcut?: string;
}

interface NavItem {
	type: "link" | "submenu" | "card";
	label: string;
	href?: string;
	icon?: typeof Home;
	shortcut?: string;
	subitems?: SubItem[];
	cardContent?: React.ReactNode;
}

// ─── Config ───────────────────────────────────────────────────────────────

const mainMenuItems: NavItem[] = [
	{ type: "link", label: "Home", href: "/", icon: Home },
	{ type: "link", label: "Blog", href: "/blog", icon: Newspaper },
	{
		type: "submenu",
		label: "Projects",
		icon: LayoutDashboard,
		subitems: [
			{ label: "⚡NEXT-static", href: "/projects/next-static" },
			{ label: "📃NEXT-blog", href: "/projects/next-blog" },
			{ type: "separator" },
			{ label: "🤣Emoji UI", href: "/projects/emoji-ui" },
		],
	},
	{
		type: "submenu",
		label: "Tools",
		icon: Wrench,
		subitems: [
			{ label: "Flags", href: "/tools/flags", icon: Flag },
			{ label: "Emoji", href: "/tools/emoji", icon: Smile },
			{ label: "WebFont", href: "/tools/webfont", icon: Text },
			{ type: "separator" },
			{ label: "Image Magic", href: "/tools/image-magic", icon: PaintbrushIcon },
		],
	},
	{
		type: "submenu",
		label: "Tutorials",
		icon: Lightbulb,
		subitems: [
			{ label: "🌬️Tailwind", href: "/tutorials/tailwind"},
			{ label: "📃Markdown", href: "/tutorials/markdown"},
		],
	},
	/*
	{
		type: "card",
		label: "Support My Work",
		icon: HeartHandshake,
		cardContent: (
			<div className="space-y-3 text-sm">
				<p className="text-muted-foreground">
					If my open-source stuff, rants, or AI tinkering helps — a coffee or sponsor keeps the cauldron bubbling 🧙‍♀️
				</p>
				<div className="flex flex-col gap-2">
					<a
						href="https://www.paypal.com/ncp/payment/BVY3E2H2E2VWA"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex h-8 items-center justify-center rounded bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary/90"
					>
						♥️Buy me a coffee!☕
					</a>
					<a
						href="https://github.com/sponsors/TheWhiteWitchTM"
						target="_blank"
						rel="noopener noreferrer"
						className="text-xs text-muted-foreground hover:text-foreground underline"
					>
						Sponsor on GitHub
					</a>
				</div>
			</div>
		),
	},
	*/
];

// ─── Component ────────────────────────────────────────────────────────────

export function MainMenu() {
	const pathname = usePathname();

	const isActive = (item: NavItem) => {
		if (item.href && pathname === item.href) return true;
		if (item.subitems) {
			return item.subitems.some((sub) => sub.href === pathname);
		}
		return false;
	};

	// Desktop: flex-row left to right
	const DesktopMenu = () => (
		<div className={"mx-10 px-10 -my-0.5"}>
		<div className="hidden md:flex flex-row gap-2">
			{mainMenuItems.map((item, index) => {
				const active = isActive(item);
				const buttonClasses = cn(
					"h-9 rounded-md text-sm font-medium transition-colors",
					"flex items-center gap-1.5",
					"hover:bg-accent hover:text-accent-foreground",
					active && "underline underline-offset-4"
				);

				return (
					<div key={index}>
						{item.type === "link" && item.href && (
							<Link href={item.href}>
								<Button variant="ghost" className={buttonClasses}>
									{item.icon && <item.icon className="h-4 w-4" />}
									{item.label}
								</Button>
							</Link>
						)}

						{item.type === "submenu" && item.subitems && (
							<Popover>
								<PopoverTrigger asChild>
									<Button variant="ghost" className={buttonClasses}>
										{item.icon && <item.icon className="h-4 w-4" />}
										{item.label}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-48 p-0">
									<div className="component !-mt-0.5 flex flex-col py-1">
										{item.subitems.map((sub, subIndex) => {
											if (sub.type === "separator") {
												return <Separator key={subIndex} className="my-1" />;
											}
											const subActive = sub.href === pathname;
											return (
												<Link
													key={subIndex}
													href={sub.href || "#"}
													className={cn(
														"flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent",
														subActive && "underline underline-offset-4 bg-accent/50"
													)}
												>
													{sub.icon && <sub.icon className="h-4 w-4" />}
													{sub.label}
													{sub.shortcut && <span className="ml-auto text-xs opacity-50">{sub.shortcut}</span>}
												</Link>
											);
										})}
									</div>
								</PopoverContent>
							</Popover>
						)}

						{item.type === "card" && item.cardContent && (
							<Popover>
								<PopoverTrigger asChild>
									<Button variant="ghost" className={buttonClasses}>
										{item.icon && <item.icon className="h-4 w-4" />}
										{item.label}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-80 p-0 border-0 shadow-md">
									<Card className="border-0 shadow-none">
										<CardHeader className="pb-2">
											<CardTitle className="text-sm">{item.label}</CardTitle>
										</CardHeader>
										<CardContent>{item.cardContent}</CardContent>
									</Card>
								</PopoverContent>
							</Popover>
						)}
					</div>
				);
			})}
		</div>
		</div>
	);

	// Mobile: hamburger sheet with vertical list
	const MobileMenu = () => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="md:hidden">
					<Menu className="h-5 w-5" />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="w-64 p-0">
				<div className="flex flex-col p-4">
					{mainMenuItems.map((item, index) => {
						const active = isActive(item);
						return (
							<div key={index} className="py-1">
								{item.type === "link" && item.href && (
									<Link
										href={item.href}
										className={cn(
											"flex items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-accent",
											active && "underline underline-offset-4 bg-accent/50"
										)}
									>
										{item.icon && <item.icon className="h-4 w-4" />}
										{item.label}
										{item.shortcut && <span className="ml-auto text-xs opacity-50">{item.shortcut}</span>}
									</Link>
								)}

								{item.type === "submenu" && item.subitems && (
									<div>
										<div
											className={cn(
												"flex items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-accent",
												active && "underline underline-offset-4 bg-accent/50"
											)}
										>
											{item.icon && <item.icon className="h-4 w-4" />}
											{item.label}
											{item.shortcut && <span className="ml-auto text-xs opacity-50">{item.shortcut}</span>}
										</div>
										<div className="ml-6 border-l pl-2 space-y-1">
											{item.subitems.map((sub, subIndex) => {
												if (sub.type === "separator") {
													return <Separator key={subIndex} className="my-1" />;
												}
												const subActive = sub.href === pathname;
												return (
													<Link
														key={subIndex}
														href={sub.href || "#"}
														className={cn(
															"flex items-center gap-2 px-2 py-1 text-sm hover:bg-accent/50",
															subActive && "underline underline-offset-4 bg-accent/30"
														)}
													>
														{sub.icon && <sub.icon className="h-4 w-4" />}
														{sub.label}
														{sub.shortcut && <span className="ml-auto text-xs opacity-50">{sub.shortcut}</span>}
													</Link>
												);
											})}
										</div>
									</div>
								)}

								{item.type === "card" && item.cardContent && (
									<div>
										<div
											className={cn(
												"flex items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-accent",
												active && "underline underline-offset-4 bg-accent/50"
											)}
										>
											{item.icon && <item.icon className="h-4 w-4" />}
											{item.label}
											{item.shortcut && <span className="ml-auto text-xs opacity-50">{item.shortcut}</span>}
										</div>
										<div className="ml-6 p-2">
											<Card className="shadow-none border">
												<CardHeader className="p-3 pb-1">
													<CardTitle className="text-sm">{item.label}</CardTitle>
												</CardHeader>
												<CardContent className="p-3 pt-0">{item.cardContent}</CardContent>
											</Card>
										</div>
									</div>
								)}
							</div>
						);
					})}
				</div>
			</SheetContent>
		</Sheet>
	);

	return (
		<div className="flex items-start gap-1">
			<MobileMenu />
			<DesktopMenu />
		</div>
	);
}