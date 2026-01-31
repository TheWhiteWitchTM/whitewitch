import {PageContent} from "@/next-static/legacy/PageContent";
import {EmojiBuilder} from "@/components/EmojiBuilder";
import Link from "next/link";
import * as React from "react";

export default function Emoji() {
	return (
		<PageContent className={"prose dark:prose-invert"}>
			<h2>🤣Emoji Builder</h2>
			<span className={"font-flags"}>
			<EmojiBuilder/>
			</span>
		</PageContent>
	)
}