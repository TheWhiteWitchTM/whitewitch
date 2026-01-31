import {PageContent} from "@/next-static/legacy/PageContent";
import {FlagBuilder} from "@/components/FlagBuilder";
import Link from "next/link";
import * as React from "react";

export default function () {
	return (
		<PageContent className={"prose dark:prose-invert"}>
			<h2>🏳️‍Flag Builder</h2>
			<span className={"font-flags"}>
				<FlagBuilder/>
			</span>
	</PageContent>
	)
}