import {PageContent} from "@/next-static/legacy/PageContent";
import MDX from "./tailwind.mdx"
import {Wind} from "lucide-react";

export default function () {
	return (
		<PageContent className={"prose dark:prose-invert"}>
			<h2>🌬️Tailwind Tutorial</h2>
			<MDX/>
	</PageContent>
	)
}