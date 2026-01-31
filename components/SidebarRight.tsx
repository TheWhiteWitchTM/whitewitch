import Link from "next/link";
import {Button} from "@/emoji-ui/ui/Button"
import {
	Globe,
	Youtube,
	Twitter,
	Github,
	Mail, Linkedin,
} from "lucide-react"
import {BlueSky} from "@/components/BlueSky";

export default function () {

	return(
		<div className="flex flex-col gap-0.5">
			<Button
				variant={"link"}
			>
				<Link
					href={"https://youtube.com/@thewhitewitchtm"}
					target="_blank"
				>
					<Youtube/>
				</Link>
			</Button>
			<Button
				variant={"link"}
			>
				<Link
					href={"https://bsky.app/profile/thewhitewitchtm.sociallydead.me"}
					target="_blank"
				>
					<BlueSky className={"h-6 w-6"}/>
				</Link>
			</Button>
			<Button
				variant={"link"}
			>
				<Link
					href={"https://x.com/@thewhitewitchtm"}
					target="_blank"
				>
					<Twitter/>
				</Link>
			</Button>
			<Button
				variant={"link"}
			>
				<Link
					href={"https://github.com/TheWhiteWitchTM"}
					target="_blank"
				>
					<Github/>
				</Link>
			</Button>
			<Button
				variant={"link"}
			>
				<Link
					href={"mailto://thewhitewitchtm@gmail.com"}
					target="_blank"
				>
					<Mail/>
				</Link>
			</Button>
		</div>
	)
}