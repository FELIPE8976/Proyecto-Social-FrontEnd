import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CreateBeneficiaryFourthForm } from "@/types/CreateBeneficiaryForm";
import { useFormikContext } from "formik";

export function CreateBeneficiaryFourthForm() {
	const { values, handleChange, errors } =
		useFormikContext<CreateBeneficiaryFourthForm>();
	// Date
	const currentDate = new Date();
	const formattedDate = `${currentDate.getDate()} / ${currentDate.getMonth() + 1} / ${currentDate.getFullYear()}`;

	return (
		<div className="flex w-[80%] flex-col gap-5">
			<div className="flex h-[100%] w-[100%] flex-col items-start">
				<div className="flex flex-col">
					<div className="flex flex-row gap-1">
						<div
							className="primary-font"
							style={{
								fontSize: "0.9rem",
								color: "#666666",
							}}
						>
							Fecha de Solicitud:
						</div>
						<div
							className="secondary-font"
							style={{
								fontSize: "0.9rem",
							}}
						>
							{formattedDate}
						</div>
					</div>
					<div
						className="secondary-font text-secondary"
						style={{
							fontSize: "2.5rem",
						}}
					>
						Historia No. 01
					</div>
					<div
						className="secondary-font text-accent"
						style={{
							fontSize: "2.0rem",
						}}
					>
						REMISIÓN
					</div>
				</div>
			</div>
			<div className="flex w-[100%] flex-row gap-5">
				<div className="flex w-[100%] flex-col gap-3 rounded-lg">
					<Label htmlFor="email">REMITIDO POR</Label>
					<Input
						className="h-16"
						type="text"
						value={values.referred_by}
						valid={!errors.referred_by}
						onChange={handleChange}
						id="referred_by"
						placeholder="Type Here"
					/>
				</div>
			</div>
			<div className="flex w-[100%] flex-row gap-5">
				<div className="flex w-[100%] flex-col gap-3 rounded-lg">
					<Label htmlFor="email">ENTIDAD / ORGANIZACIÓN</Label>
					<Input
						className="h-16"
						type="text"
						id="entity_organization"
						value={values.entity_organization}
						valid={!errors.entity_organization}
						onChange={handleChange}
						placeholder="Type Here"
					/>
				</div>
			</div>
			<div className="flex w-[100%] flex-row gap-5">
				<div className="flex w-[100%] flex-col gap-3 rounded-lg">
					<Label htmlFor="email">DIRECCIÓN</Label>
					<Input
						className="h-16"
						type="text"
						id="referral_address"
						value={values.referral_address}
						valid={!errors.referral_address}
						onChange={handleChange}
						placeholder="Type Here"
					/>
				</div>
			</div>
			<div className="flex w-[100%] flex-row gap-5">
				<div className="flex w-[100%] flex-col gap-3 rounded-lg">
					<Label htmlFor="email">TELÉFONO</Label>
					<Input
						className="h-16"
						type="text"
						id="referral_phones"
						value={values.referral_phones}
						valid={!errors.referral_phones}
						onChange={handleChange}
						placeholder="Type Here"
					/>
				</div>
			</div>
		</div>
	);
}
