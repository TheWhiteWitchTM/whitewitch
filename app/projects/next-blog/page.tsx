import {PageContent} from "@/next-static/legacy/PageContent";
import Intro from "@/blog/next-blog/introduction/page.mdx"
export default function () {
	return(
		<PageContent className={"prose dark:prose-invert"}>
			<h2>📃NEXT-blog</h2>
			<Intro/>
	</PageContent>
	)
}