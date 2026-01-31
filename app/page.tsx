import Image from "next/image"
import {PageContent} from "@/next-static/legacy/PageContent";
import Intro from "./intro.mdx"

export default function Home()  {
	return (
		<PageContent className={"prose dark:prose-invert"}>
			<h1>♥️ Welcome Mira's World™ ☕</h1>
			<div className={"prose dark:prose-invert"}>
			<Image
				src={"/banner.jpg"}
				alt="Home Image"
				width="150"
				height="75"
				className="float-left m-2 rounded-lg shadow-md"
				priority
			/>
			<Intro/>
			</div>
		</PageContent>
	)
}