"use client"
import Link from "next/link"
import {PageContent} from "@/next-static/legacy/PageContent";
import {ImageMagic} from "@/components/ImageMagic";
import * as React from "react";

export default function () {
	return (
	<PageContent className={"prose dark:prose-invert"}>
		<h2 className={"m-0 p-0"}>🖼️Image Magic</h2>
		<ImageMagic/>
	</PageContent>
	)
}