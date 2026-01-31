import {PageContent} from "@/next-static/legacy/PageContent";
import {WebfontBuilder} from "@/components/WebFontBuilder";
import Link from "next/link";
import * as React from "react";

export default function Emoji() {
	return (
		<PageContent className={"prose dark:prose-invert"}>
			<h2>🔤WebFont Builder</h2>
			<WebfontBuilder/>
		</PageContent>
	)
}