import { Button } from "@/components/ui/button";
import { useFormikContext } from "formik";
import { ArrowRightIcon, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export function HouseButtons() {
	const router = useRouter();
	const { submitForm, isValid } = useFormikContext();
	return (
		<div className="flex w-full flex-row justify-between px-5 pb-5">
			<button
				className="flex flex-row items-center"
				onClick={() => {
					router.back();
				}}
			>
				<div className="flex h-10 w-10 flex-row items-center justify-center">
					<ChevronLeft size={24} className="text-secondary" />
				</div>
				<div className="text-xl text-secondary">Volver</div>
			</button>
			<Button
				type="submit"
				disabled={!isValid}
				className="flex h-16 w-16 items-center justify-center rounded-full"
				onClick={() => {
					submitForm();
				}}
			>
				<ArrowRightIcon size={32} />
			</Button>
		</div>
	);
}
