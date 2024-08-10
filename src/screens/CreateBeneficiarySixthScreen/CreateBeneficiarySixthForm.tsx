import { Input } from "@/components/ui/input";
import type { CreateBeneficiarySixthForm } from "@/types/CreateBeneficiaryForm";
import { useFormikContext } from "formik";

export function CreateBeneficiarySixthForm() {
	const { values, handleChange, errors } =
		useFormikContext<CreateBeneficiarySixthForm>();

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
							fontSize: "2.0rem",
						}}
					>
						Historia No. 01
					</div>
				</div>
			</div>
			<div className="flex w-[100%] flex-row gap-5">
				<div className="flex w-[100%] flex-col gap-3 rounded-lg">
					<div
						className="secondary-font text-accent"
						style={{
							fontSize: "2.0rem",
						}}
					>
						DX / MOTIVO O CAUSA DE REMISIÓN
					</div>
					<Input
						className="h-32"
						type="text"
						id="referral_cause"
						valid={!errors.referral_cause}
						value={values.referral_cause}
						onChange={handleChange}
					/>
				</div>
			</div>
			<div className="flex w-[100%] flex-row gap-5">
				<div className="flex w-[100%] flex-col gap-3 rounded-lg">
					<div
						className="secondary-font text-accent"
						style={{
							fontSize: "2.0rem",
						}}
					>
						SOLICITUD DE APOYO
					</div>
					<Input
						className="h-32"
						type="text"
						id="support_request"
						valid={!errors.support_request}
						value={values.support_request}
						onChange={handleChange}
					/>
				</div>
			</div>
			<div className="flex w-[100%] flex-row gap-5">
				<div className="flex w-[100%] flex-col gap-3 rounded-lg">
					<div
						className="secondary-font text-accent"
						style={{
							fontSize: "2.0rem",
						}}
					>
						OBSERVACIONES
					</div>
					<Input
						className="h-32"
						type="text"
						id="observations"
						valid={!errors.observations}
						value={values.observations}
						onChange={handleChange}
					/>
				</div>
			</div>
		</div>
	);
}
