import * as React from "react";
import {PageContent} from "@/next-static/legacy/PageContent";
import Intro from "@/blog/emoji-ui/introduction/page.mdx"


export default function () {
	return(
		<PageContent className={"prose dark:prose-invert"}>
			<h2>🤣Emoji-UI</h2>
			<Intro/>
	</PageContent>
	)
}