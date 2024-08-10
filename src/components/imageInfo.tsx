import Gato from "@/assets/cat.jpg";
import Image from "next/image";

type Props = {
	name: string;
	linkImage: string;
};

export default function ImageInfo({ name, linkImage }: Props) {
	return (
		<div>
			<div className="mt-2 text-center text-xl font-bold text-[#C5CD3C]">
				{name}
			</div>
			<div className="mb-6 mt-auto flex justify-center">
				<Image src={Gato} width={140} height={140} alt="gato" />
			</div>
		</div>
	);
}
