import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import {baseMetadata} from "@/app/metadata";
import {Appbar} from "@/next-static/legacy/Appbar";
import {MainMenu} from "@/components/MainMenu";
import Link from "next/link";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import * as React from "react";
import { ThemeProvider } from "next-themes"
import {Toolbar} from "@/components/Toolbar";
import { DigitalClock }  from "@/components/DigitalClock";
import {Weather} from "@/components/Weather";
import Image from "next/image";
import SidebarRight from "@/components/SidebarRight";
import { Analytics } from "@vercel/analytics/next"
import { Layout } from "@/emoji-ui/ui/Layout"
import SidebarLeft from "@/components/SidebarLeft";

export const metadata: Metadata = baseMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	const header = (
		<Appbar className={"component"}
			left={
			<div className={"flex flex-row gap-2"}>
				<Avatar className={"border-2 border-green-600 shadow-[0_0_10px_#dc2626] shadow-green-500/70>"}>
					<AvatarImage src={"/icon-192x192.png"}/>
				</Avatar>
				<div className={"mt-1.5 clock-font text-green-600"}>
					<b>Mira's World™</b>
				</div>
			</div>
		}
			right={<Toolbar/>}
		>
			<MainMenu/>
		</Appbar>
	)

	const footer = (
		<Appbar className={"component"}
			left={
				<div className={"px-3 pt-1 flex flex-row gap-2"}>
					<DigitalClock/>
					<Weather/>
				</div>
			}
			right={
			<span className={"px-5"}>
			<Link
				href="https://www.paypal.com/ncp/payment/BVY3E2H2E2VWA"
				target="_blank"
				rel="noopener noreferrer"
			>
				♥️Buy me a coffee!☕
			</Link>
			</span>
		}>
			<span className={"px-5"}>
				Build using ⚡NEXT-static & 📃NEXT-blog!
			</span>
		</Appbar>
	)

	const left = (
		<div className={"hidden md:flex flex-col flex-1 !my-4 !p-2 component w-40"}>
			<SidebarLeft/>
		</div>
	)

	const right = (
		<div className={"hidden md:flex flex-col flex-1 !my-4 !p-2 component w-20"}>
			<Link
				href={"https://thewhitewitchtm.sociallydead.me/"}
				target={"_blank"}>
			<Image
				src={"/witch.png"}
				alt={"Logo"}
				width={200}
				height={200}
				priority
			/>
			</Link>
			<SidebarRight/>
		</div>
	)

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className={"w-full h-full m-0 p-0 min-h-screen bg-background text-foreground antialiased"}>
      <Analytics/>
      <ThemeProvider
	      attribute="class"
	      defaultTheme="system"
	      enableSystem
	      disableTransitionOnChange
      >
	        <Layout
		        header={header}
		        footer={footer}
		        leftSidebar={left}
		        rightSidebar={right}
		        children={children}
	        />
          <Toaster/>
      </ThemeProvider>
      </body>
    </html>
  );
}
