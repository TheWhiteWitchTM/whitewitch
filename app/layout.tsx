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
		<div className={"flex flex-col w-full"}>
			<div className={"desktop flex flex-col"}>
				<div className={"w-30 min-w-30"}>
				<Image
					src={"/witch.png"}
					alt={"Witch!"}
					width={150}
					height={150}
					priority
					className={"absolute top-0 left-0 z-50 inset-1 rounded-full shadow-lg"}
				/>
				</div>
				<div className={"flex-1 text-lg ml-30 mt-5 "}>
					‍🧙‍♀️️<b>The White Witch™</b>✨
				</div>
			</div>
		<Appbar className={"component"}
			left={
			<div className={"w-35"}/>
		}
			right={<Toolbar/>}
		>
			<MainMenu/>
		</Appbar>
		</div>
	)

	const footer = (
		<Appbar className={"component"}
			left={
				<div className={"px-3"}>
					SpellBook will be here
				</div>
			}
			right={
			<span className={"px-5"}>
			<Link
				href="https://www.paypal.com/ncp/payment/4P85EQRES3RGU"
				target="_blank"
				rel="noopener noreferrer"
			>
				♥️Buy me a coffee!☕
			</Link>
			</span>
		}>
			<span className={"px-5"}>
				Build using ⚡NEXT-static & 🤣emoji-ui!
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
