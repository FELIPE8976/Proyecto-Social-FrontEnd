import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { CreateBeneficiarySecondForm } from "@/types/CreateBeneficiaryForm";
import { useFormikContext } from "formik";
import {DocumentTypes} from "@/api/user/documentTypes"
import {SocioeconimicStatus} from "@/api/user/socioeconomicStatus"
import { Departments } from "@/api/user/departments";
import { Cities } from "@/api/user/cities";


interface DocumentType {
  identification_type_id: string;
  description: string;
}


interface SocioeconimicStatusI {
  socioeconomic_status_id: string;
  socioeconomic_status_value: number;
}
interface CityI {
  city_id: string;
  city_name: string;
}
interface DepartmentI {
  department_id: string;
  department_name: string;
}

export function CreateBeneficiarySecondForm() {
	const { values, handleChange, setFieldValue, errors } =
		useFormikContext<CreateBeneficiarySecondForm>();

	const [selectedDepartment, setSelectedDepartment] = useState("");
  	// const [cities, setCities] = useState<CityI[]>([]);


	// Date
	const currentDate = new Date();
	const formattedDate = `${currentDate.getDate()} / ${currentDate.getMonth() + 1} / ${currentDate.getFullYear()}`;
  	const tiposDocumentos: DocumentType[] = DocumentTypes();
	const socioeconimicStatus: SocioeconimicStatusI[] = SocioeconimicStatus();
	const departments: DepartmentI[] = Departments();
	const cities: CityI[] = Cities(selectedDepartment);

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
						className="secondary-font"
						style={{
							fontSize: "2.5rem",
							color: "#C5CD3C",
						}}
					>
						Historia No. 01
					</div>
				</div>
			</div>
			<div className="flex w-[100%] flex-row gap-5">
				<div className="flex w-[80%] flex-col gap-3 rounded-lg">
					<Label htmlFor="email">
						NOMBRE DE PERSONA ENTREVISTADA
					</Label>
					<Input
						id="interviewed_person_names"
						valid={!errors.interviewed_person_names}
						onChange={handleChange}
						className="h-16"
						type="text"
						placeholder="Type Here"
					/>
				</div>
				<div className="flex w-[80%] flex-col gap-3 rounded-lg">
					<Label htmlFor="email">PRIMER APELLIDO</Label>
					<Input
						className="h-16"
						type="text"
						id="interviewed_person_first_last_name"
						valid={!errors.interviewed_person_first_last_name}
						onChange={handleChange}
						placeholder="Type Here"
					/>
				</div>
				<div className="flex w-[80%] flex-col gap-3 rounded-lg">
					<Label htmlFor="email">SEGUNDO APELLIDO</Label>
					<Input
						className="h-16"
						type="text"
						valid={!errors.interviewed_person_second_last_name}
						id="interviewed_person_second_last_name"
						onChange={handleChange}
						placeholder="Type Here"
					/>
				</div>
			</div>
			<div className="flex w-[100%] flex-row gap-5">
				<div className="flex w-[80%] flex-col gap-3 rounded-lg">
					<Label htmlFor="email">PARENTESCO</Label>
					<Select
						value={values.relationship}
						onValueChange={(value) => {
							setFieldValue("relationship", value);
						}}
					>
						<SelectTrigger
							className="h-16 rounded-lg border-2 focus:border-primary"
							id="relationship"
						>
							<SelectValue placeholder="MADRE" />
						</SelectTrigger>
						<SelectContent className="focus:border-primary">
							<SelectGroup>
								<SelectItem value="MADRE">MADRE</SelectItem>
								<SelectItem value="PADRE">PADRE</SelectItem>
								<SelectItem value="HERMANA">HERMANA</SelectItem>
								<SelectItem value="HERMANO">HERMANO</SelectItem>
								<SelectItem value="ACUDIENTE">
									ACUDIENTE
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div className="flex w-[80%] flex-col gap-3 rounded-lg">
					<Label htmlFor="email">IDENTIFICACIÓN</Label>
					<Select
							value={values.interviewed_person_id_type}
							onValueChange={(value) => {
								setFieldValue("interviewed_person_id_type", value);
							}}
							>
							<SelectTrigger
								className="h-16 rounded-lg border-2 focus:border-primary"
								id="interviewed_person_id_type"
							>
								<SelectValue placeholder="" />
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
					</Select>
				</div>
				<div className="flex w-[80%] flex-col gap-3 rounded-lg">
					<Label htmlFor="email">NÚMERO DE DOCUMENTO</Label>
					<Input
						className="h-16"
						type="text"
						id="interviewed_person_id"
						valid={!errors.interviewed_person_id}
						onChange={handleChange}
						value={values.interviewed_person_id}
						placeholder="Type Here"
					/>
				</div>
			</div>
			<div className="h-[2px] w-[100%] rounded-xl bg-[#D9DBE9]" />
			<div className="flex w-[100%] flex-row gap-5">
				<div className="flex w-[80%] flex-col gap-3 rounded-lg">
					<Label htmlFor="email">DIRECCIÓN</Label>
					<Input
						id="address"
						valid={!errors.address}
						onChange={handleChange}
						value={values.address}
						className="h-16"
						type="text"
						placeholder="Type Here"
					/>
				</div>
				<div className="flex w-[80%] flex-col gap-3 rounded-lg">
					<Label htmlFor="email">BARRIO</Label>
					<Input
						id="district"
						valid={!errors.district}
						onChange={handleChange}
						value={values.district}
						className="h-16"
						type="text"
						placeholder="Type Here"
					/>
				</div>
				<div className="flex w-[80%] flex-row gap-3 rounded-lg">
					<div className="flex w-[30%] flex-col gap-3">
						<Label htmlFor="email">COMUNA</Label>
						<Select
							value={values.community}
							onValueChange={(value) => {
								setFieldValue("community", value);
							}}
						>
							<SelectTrigger
								className="h-16 rounded-lg border-2 focus:border-primary"
								id="community"
							>
								<SelectValue placeholder="1" />
							</SelectTrigger>
							<SelectContent className="focus:border-primary">
								<SelectGroup>
									{Array.from({ length: 22 }, (_, i) => (
										<SelectItem
											key={i + 1}
											value={(i + 1).toString()}
										>
											{i + 1}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<div className="flex flex-1 flex-col gap-3">
						<Label htmlFor="email">ESTRATO SOCIOECONÓMICO</Label>
						<Select
							value={values.socioeconomic_status_id.socioeconomic_status_value.toString()}
							onValueChange={(value) => {
								setFieldValue("socioeconomic_status_id.socioeconomic_status_value", value);
							}}
							>
							<SelectTrigger
								className="h-16 rounded-lg border-2 focus:border-primary"
								id="socioeconomic_status_id.socioeconomic_status_value"
							>
								<SelectValue placeholder="" />
							</SelectTrigger>
							<SelectContent className="focus:border-primary">
								<SelectGroup>
								{socioeconimicStatus.map((status) => (
									<SelectItem
									key={status.socioeconomic_status_id}
									value={status.socioeconomic_status_value.toString()}
									>
									{status.socioeconomic_status_value.toString()}
									</SelectItem>
								))}
								</SelectGroup>
							</SelectContent>
					</Select>
					</div>
				</div>
			</div>
			<div className="flex w-[100%] flex-row gap-5">
				<div className="flex w-[80%] flex-col gap-3 rounded-lg">
					<Label htmlFor="email">PAÍS</Label>
					<Select
						value={values.country}
						onValueChange={(value) => {
							setFieldValue("country", value);
						}}
						>
						<SelectTrigger
							className="h-16 rounded-lg border-2 focus:border-primary"
							id="country"
						>
							<SelectValue placeholder="" />
						</SelectTrigger>
						<SelectContent className="focus:border-primary">
							<SelectGroup>
								<SelectItem value="COLOMBIA">COLOMBIA</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div className="flex w-[80%] flex-col gap-3 rounded-lg">
					<Label htmlFor="email">CIUDAD</Label>
					<Select
							value={values.city}
							onValueChange={(value) => {
								setFieldValue("city", value);
							}}
							>
							<SelectTrigger
								className="h-16 rounded-lg border-2 focus:border-primary"
								id="city"
							>
								<SelectValue placeholder="" />
							</SelectTrigger>
							<SelectContent className="focus:border-primary">
								<SelectGroup>
								{cities.map((city) => (
									<SelectItem
									key={city.city_id}
									value={city.city_name}
									>
									{city.city_name}
									</SelectItem>
								))}
								</SelectGroup>
							</SelectContent>
					</Select>
				</div>
				<div className="flex w-[80%] flex-col gap-3 rounded-lg">
					<Label htmlFor="email">DEPARTAMENTO</Label>
					<Select
							value={values.department}
							onValueChange={(value) => {
								setFieldValue("department", value);
								const selectedDepartment = departments.find(dept => dept.department_name === value);
								if (selectedDepartment) {
                					setSelectedDepartment(selectedDepartment.department_id);
            					}
							}}
							>
							<SelectTrigger
								className="h-16 rounded-lg border-2 focus:border-primary"
								id="department"
							>
								<SelectValue placeholder="" />
							</SelectTrigger>
							<SelectContent className="focus:border-primary">
								<SelectGroup>
								{departments.map((department) => (
									<SelectItem
									key={department.department_id}
									value={department.department_name}
									>
									{department.department_name}
									</SelectItem>
								))}
								</SelectGroup>
							</SelectContent>
					</Select>
				</div>
			</div>
			<div className="flex w-[100%] flex-row gap-5">
				<div className="flex w-[80%] flex-col gap-3 rounded-lg">
					<Label htmlFor="email">TELÉFONO</Label>
					<Input
						id="first_phone_number"
						onChange={handleChange}
						valid={!errors.first_phone_number}
						value={values.first_phone_number}
						className="h-16"
						type="text"
						placeholder="Type Here"
					/>
				</div>
				<div className="flex w-[80%] flex-col gap-3 rounded-lg">
					<Label htmlFor="email">TELÉFONO</Label>
					<Input
						id="second_phone_number"
						onChange={handleChange}
						valid={!errors.second_phone_number}
						value={values.second_phone_number}
						className="h-16"
						type="text"
						placeholder="Type Here"
					/>
				</div>
				<div className="flex w-[80%] flex-col gap-3 rounded-lg">
					<Label htmlFor="email">TELÉFONO</Label>
					<Input
						id="third_phone_number"
						onChange={handleChange}
						valid={!errors.third_phone_number}
						value={values.third_phone_number}
						className="h-16"
						type="text"
						placeholder="Type Here"
					/>
				</div>
			</div>
		</div>
	);
}
