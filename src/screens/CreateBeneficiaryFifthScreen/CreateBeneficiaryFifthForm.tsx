import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { CreateBeneficiaryFifthForm } from "@/types/CreateBeneficiaryForm";
import { useFormikContext } from "formik";
import {DocumentTypes} from "@/api/user/documentTypes"

interface DocumentType {
  identification_type_id: string;
  description: string;
}

export function CreateBeneficiaryFifthForm() {
	const { values, handleChange, setFieldValue } =
		useFormikContext<CreateBeneficiaryFifthForm>();

	const addMember = () => {
		setFieldValue("family_members", [
			...values.family_members,
			{
				full_name: "",
				age: 0,
				relationship: "MADRE",
				education_level: "POSGRADO",
				document_type: "CC",
				document_number: "",
				occupation: "",
				monthly_income: 0,
			},
		]);
	};

	const removeMember = (index: any) => {
		setFieldValue(
			"family_members",
			values.family_members.filter((_, i) => i !== index)
		);
	};
	
	const tiposDocumentos: DocumentType[] = DocumentTypes();


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
						COMPOSICIÓN DEL GRUPO FAMILIAR Y SITUACIÓN ECONÓMICA
					</div>
				</div>
			</div>
			{values.family_members.map((member, index) => (
				<div key={index} className="flex flex-col gap-5">
					<div className="flex w-[100%] flex-row gap-5">
						<div className="flex w-[40%] flex-col gap-3 rounded-lg">
							<Label htmlFor={`full_name-${index}`}>
								NOMBRE COMPLETO
							</Label>
							<Input
								className="h-16"
								type="text"
								id={"full_name"}
								placeholder="Type Here"
								value={values.family_members[index].full_name}
								onChange={(
									event: React.ChangeEvent<HTMLInputElement>
								) =>
									setFieldValue(
										`family_members[${index}].full_name`,
										event.target.value
									)
								}
							/>
						</div>
						<div className="flex w-[40%] flex-col gap-3 rounded-lg">
							<Label htmlFor={`age-${index}`}>EDAD</Label>
							<Input
								className="h-16"
								type="number"
								id={"age"}
								placeholder="Type Here"
								value={values.family_members[index].age}
								onChange={(
									event: React.ChangeEvent<HTMLInputElement>
								) =>
									setFieldValue(
										`family_members[${index}].age`,
										event.target.value
									)
								}
							/>
						</div>
						<div className="flex w-[80%] flex-col gap-3 rounded-lg">
							<Label htmlFor={`relationship-${index}`}>
								PARENTESCO
							</Label>
							<Select
								value={
									values.family_members[index].relationship
								}
								onValueChange={(value) =>
									setFieldValue(
										`family_members[${index}].relationship`,
										value
									)
								}
							>
								<SelectTrigger
									className="h-16 rounded-lg border-2 focus:border-primary"
									id={`relationship`}
								>
									<SelectValue placeholder="MADRE" />
								</SelectTrigger>
								<SelectContent className="focus:border-primary">
									<SelectGroup>
										<SelectItem value="MADRE">
											MADRE
										</SelectItem>
										<SelectItem value="PADRE">
											PADRE
										</SelectItem>
										<SelectItem value="ACUDIENTE">
											ACUDIENTE
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div className="flex w-[80%] flex-col gap-3 rounded-lg">
							<Label htmlFor={`education_level-${index}`}>
								ESCOLARIDAD
							</Label>
							<Select
								value={
									values.family_members[index].education_level
								}
								onValueChange={(value) =>
									setFieldValue(
										`family_members[${index}].education_level`,
										value
									)
								}
							>
								<SelectTrigger
									className="h-16 rounded-lg border-2 focus:border-primary "
									id={`education_level`}
								>
									<SelectValue placeholder="POSGRADO" />
								</SelectTrigger>
								<SelectContent className="focus:border-primary">
									<SelectGroup>
										<SelectItem value="POSGRADO">
											POSGRADO
										</SelectItem>
										<SelectItem value="UNIVERSIDAD">
											UNIVERSIDAD
										</SelectItem>
										<SelectItem value="SECUNDARIA">
											SECUNDARIA
										</SelectItem>
										<SelectItem value="PRIMARIA">
											PRIMARIA
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
					</div>
					<div className="flex w-[100%] flex-row gap-5">
						<div className="flex w-[40%] flex-col gap-3 rounded-lg">
							<Label htmlFor={`identificacion-${index}`}>
								IDENTIFICACIÓN
							</Label>
							<Select
								value={values.family_members[index].document_type}
								onValueChange={(value) => {
									setFieldValue(
											`family_members[${index}].document_type`,
											value
										)
								}}
								>
								<SelectTrigger
									className="h-16 rounded-lg border-2 focus:border-primary"
									id="document_type"
								>
									<SelectValue placeholder="TI" />
								</SelectTrigger>
								<SelectContent className="focus:border-primary">
									<SelectGroup>
									<SelectItem value="TI">TI</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
							{/* <Select
								value={values.family_members[index].document_type}
								onValueChange={(value) => {
									setFieldValue(
											`family_members[${index}].document_type`,
											value
										)
								}}
								>
								<SelectTrigger
									className="h-16 rounded-lg border-2 focus:border-primary"
									id="document_type"
								>
									<SelectValue placeholder="TI" />
								</SelectTrigger>
								<SelectContent className="focus:border-primary">
									<SelectGroup>
									{tiposDocumentos.map((tipoDocumento) => (
										<SelectItem
										key={tipoDocumento.identification_type_id}
										value={tipoDocumento.description}
										>
										{tipoDocumento.description}
										</SelectItem>
									))}
									</SelectGroup>
								</SelectContent>
							</Select> */}
							
						</div>
						<div className="flex w-[80%] flex-col gap-3 rounded-lg">
							<Label htmlFor={`document_number-${index}`}>
								NÚMERO DOCUMENTO
							</Label>
							<Input
								className="h-16"
								type="text"
								id={`document_number`}
								placeholder="Type Here"
								value={
									values.family_members[index].document_number
								}
								onChange={(
									event: React.ChangeEvent<HTMLInputElement>
								) =>
									setFieldValue(
										`family_members[${index}].document_number`,
										event.target.value
									)
								}
							/>
						</div>
					</div>
					<div className="flex w-[100%] flex-row gap-5">
						<div className="flex w-[80%] flex-col gap-3 rounded-lg">
							<Label htmlFor={`occupation-${index}`}>
								OCUPACIÓN
							</Label>
							<Input
								className="h-16"
								type="text"
								id={`occupation-${index}`}
								placeholder="Type Here"
								value={values.family_members[index].occupation}
								onChange={(
									event: React.ChangeEvent<HTMLInputElement>
								) =>
									setFieldValue(
										`family_members[${index}].occupation`,
										event.target.value
									)
								}
							/>
						</div>
						<div className="flex w-[80%] flex-col gap-3 rounded-lg">
							<Label htmlFor={`monthly_income-${index}`}>
								INGRESOS DEL MES
							</Label>
							<Input
								className="h-16"
								type="number"
								id={`monthly_income-${index}`}
								placeholder="Type Here"
								value={
									values.family_members[index].monthly_income
								}
								onChange={(
									event: React.ChangeEvent<HTMLInputElement>
								) =>
									setFieldValue(
										`family_members[${index}].monthly_income`,
										event.target.value
									)
								}
							/>
						</div>
					</div>
				</div>
			))}
			<div className="flex w-full flex-row items-start justify-start gap-2">
				<button
					className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2A96B2] text-2xl text-white"
					style={{ marginTop: "1rem" }}
					onClick={addMember}
				>
					+
				</button>
				{values.family_members.length > 1 && (
					<button
						className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF5A5F] text-2xl text-white"
						style={{ marginTop: "1rem" }}
						onClick={() =>
							removeMember(values.family_members.length - 1)
						}
					>
						-
					</button>
				)}
			</div>
			<div className="flex w-[100%] flex-row justify-end gap-5">
				<div className="flex w-[40%] flex-col gap-3 rounded-lg">
					<Label htmlFor="total_monthly_income">
						TOTAL INGRESOS MENSUALES
					</Label>
					<Input
						className="h-16"
						type="number"
						id="total_monthly_income"
						placeholder="Type Here"
						value={values.total_monthly_income}
						onChange={handleChange}
					/>
				</div>
			</div>
		</div>
	);
}
