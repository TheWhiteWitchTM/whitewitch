import * as React from "react";
import Feed from "./feed"
import Post from "./post"
import {PageContent} from "@/next-static/legacy/PageContent";


type Props = {
	params: Promise<{ slug: string }>;      // ← Promise in Next.js 15+
};

export default async function Page({params}:Props) {
	const { slug } = await params;

	return (
		<PageContent>
			{
				slug.includes("/")
					? <div>Page</div>
					: <Feed params={params} />
			}
		</PageContent>
	)
}