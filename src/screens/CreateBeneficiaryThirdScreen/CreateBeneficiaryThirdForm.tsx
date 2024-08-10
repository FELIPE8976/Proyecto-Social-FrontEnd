import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { CreateBeneficiaryThirdForm } from "@/types/CreateBeneficiaryForm";
import { useFormikContext } from "formik";

export function CreateBeneficiaryThirdForm() {
	const { values, handleChange, setFieldValue, errors } =
		useFormikContext<CreateBeneficiaryThirdForm>();

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
							fontSize: "2.5rem",
						}}
					>
						TIPO DE VIVIENDA ( SELECCIONE SEGÚN CORRESPONDA )
					</div>
				</div>
			</div>
			<div className="flex w-[100%] flex-row gap-5">
				<RadioGroup
					defaultValue="Casa"
					id="housing_type.housing_type"
					onValueChange={(value) => {
						setFieldValue("housing_type.housing_type", value);
					}}
					value={values.housing_type.housing_type}
				>
					<div className="flex flex-row gap-5">
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="Casa" id="r1" />
							<Label htmlFor="r1">CASA</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="Apartamento" id="r2" />
							<Label htmlFor="r2">APARTAMENTO</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="Cuarto" id="r3" />
							<Label htmlFor="r3">CUARTO</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="Otro" id="r4" />
							<Label htmlFor="r4">OTRO</Label>
						</div>
					</div>
				</RadioGroup>
			</div>
			<div className="flex w-[100%] flex-row gap-5">
				<div className="flex w-[40%] flex-col gap-3 rounded-lg">
					<Label htmlFor="email">INDIQUE EL TIPO DE VIVIENDA</Label>
					<Input
						className="h-16"
						type="text"
						id="housing_type.housing_type"
						value={values.housing_type.housing_type}
						placeholder="Type Here"
					/>
				</div>
			</div>
			<div className="flex w-[100%] flex-row gap-5">
				<div className="flex w-[100%] flex-row gap-5">
					<RadioGroup
						id="housing_type.description"
						defaultValue="Propia"
						value={values.housing_type.description}
						onValueChange={(value) => {
							setFieldValue("housing_type.description", value);
						}}
					>
						<div className="flex flex-row gap-5">
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="Propia" id="r1" />
								<Label htmlFor="r1">PROPIA</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="Alquilada" id="r2" />
								<Label htmlFor="r2">ALQUILADA</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="Prestamo" id="r3" />
								<Label htmlFor="r3">PRÉSTAMO</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="Comodato" id="r4" />
								<Label htmlFor="r4">COMODATO</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="Familiar" id="r5" />
								<Label htmlFor="r5">FAMILIAR</Label>
							</div>
						</div>
					</RadioGroup>
				</div>
			</div>
			<div className="flex w-[100%] flex-row gap-5">
				<div className="flex w-[80%] flex-col gap-3 rounded-lg">
					<Label htmlFor="email">VALOR CRÉDITO AL MES</Label>
					<Input
						className="h-16"
						type="number"
						id="housing_type.loan_value_month"
						value={values.housing_type.loan_value_month}
						onChange={handleChange}
						placeholder="Type Here"
					/>
				</div>
				<div className="flex w-[80%] flex-col gap-3 rounded-lg">
					<Label htmlFor="email">VALOR ALQUILER AL MES</Label>
					<Input
						className="h-16"
						type="number"
						id="housing_type.rental_value_month"
						value={values.housing_type.rental_value_month}
						onChange={handleChange}
						placeholder="Type Here"
					/>
				</div>
			</div>
			<div className="flex w-[100%] flex-row gap-5">
				<div className="flex w-[100%] flex-col gap-3 rounded-lg">
					<Label htmlFor="email">BANCO</Label>
					<Input
						className="h-16"
						type="text"
						valid={!errors.housing_type?.bank}
						id="housing_type.bank"
						value={values.housing_type.bank}
						onChange={handleChange}
						placeholder="Type Here"
					/>
				</div>
			</div>
		</div>
	);
}
