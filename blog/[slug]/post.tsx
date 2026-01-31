import { postsMeta } from "@/next-blog/meta/posts-meta";

type Props = {
	params: Promise<{ slug: string }>;      // ← Promise in Next.js 15+
};

export default async function ({params}: Props) {
	const { slug } = await params;
	const meta = postsMeta.find((post) => post.slug === slug);

	return (
		<div className={"prose dark:prose-invert"}>
			<h2>{meta?.emoji}{meta?.title}</h2>
		</div>
	)
}