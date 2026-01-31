// Example: in app/page.tsx or any other page/component
 // ← no curly braces

// Then use it normally
import Rogue from "@/components/games/Rogue";
import {FullscreenWrapper} from "@/components/FullscreenWrapper";

export default function () {
	return (
		<FullscreenWrapper open={true}>
			<Rogue/>
		</FullscreenWrapper>
	);
}