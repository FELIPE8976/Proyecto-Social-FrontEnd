import heart_1 from "@/assets/vectors/active_heart_1.svg";
import heart_2 from "@/assets/vectors/active_heart_2.svg";
import heart_3 from "@/assets/vectors/active_heart_3.svg";
import heart_4 from "@/assets/vectors/active_heart_4.svg";
import heart_5 from "@/assets/vectors/active_heart_5.svg";
import heart_6 from "@/assets/vectors/active_heart_6.svg";
import active_line from "@/assets/vectors/active_line.svg";
import inactive_heart_2 from "@/assets/vectors/inactive_heart_2.svg";
import inactive_heart_3 from "@/assets/vectors/inactive_heart_3.svg";
import inactive_heart_4 from "@/assets/vectors/inactive_heart_4.svg";
import inactive_heart_5 from "@/assets/vectors/inactive_heart_5.svg";
import inactive_heart_6 from "@/assets/vectors/inactive_heart_6.svg";
import inactive_line from "@/assets/vectors/inactive_line.svg";
import partial_active_line from "@/assets/vectors/partial_active_line.svg";
import Image from "next/image";
import { Fragment } from "react";

type Props = {
	progress: number;
};

export function HouseProgressBar({ progress }: Props) {
	if (progress < 0) {
		progress = 0;
	} else if (progress > 6) {
		progress = 6;
	}

	const hearts = [heart_1, heart_2, heart_3, heart_4, heart_5, heart_6];
	const inactive_hearts = [
		heart_1,
		inactive_heart_2,
		inactive_heart_3,
		inactive_heart_4,
		inactive_heart_5,
		inactive_heart_6,
	];

	return (
		<div className="flex flex-col">
			<div className="mt-16 flex w-[90%] flex-row items-center justify-center gap-5">
				{hearts.map((heart, index) => (
					<Fragment key={index}>
						<Image
							src={
								index < progress
									? heart
									: inactive_hearts[index]
							}
							className="h-16 w-16"
							alt=""
						/>
						{index < hearts.length - 1 && (
							<Image
								src={
									index < progress - 1
										? active_line
										: index === progress - 1
											? partial_active_line
											: inactive_line
								}
								className="h-16 w-16"
								alt=""
							/>
						)}
					</Fragment>
				))}
			</div>
			<div className="my-6 h-[2px] w-[90%] rounded-xl bg-[#D9DBE9]" />
		</div>
	);
}
