import {PageContent} from "@/next-static/legacy/PageContent";
import MDX from "./markdown.mdx"

export default function () {
	return (
		<PageContent className={"prose dark:prose-invert"}>
			<h2>📃Markdown Tutorial</h2>
			<MDX/>
	</PageContent>
	)
}