"use client";

import form_children from "@/assets/images/form_children.png";
import { Calendar } from "@/components/ui/calendar";
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
import type { CreateBeneficiaryFirstForm } from "@/types/CreateBeneficiaryForm";
import { es as esLocale } from "date-fns/locale";
import { useFormikContext } from "formik";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
// import {DocumentTypes} from "@/api/user/documentTypes"

const customEsLocale = {
	...esLocale,
	localize: {
		...esLocale.localize,
		day: (day: any, _options: any) =>
			esLocale.localize.day(day, _options).charAt(0).toUpperCase() +
			esLocale.localize.day(day, _options).slice(1),
	},
};

interface DocumentType {
  identification_type_id: string;
  description: string;
}

export function CreateBeneficiaryFirstForm() {
	// Formik
	const { values, setFieldValue, handleChange, errors } =
		useFormikContext<CreateBeneficiaryFirstForm>();

	// Date

	const currentDate = new Date();
	const formattedDate = `${currentDate.getDate()} / ${currentDate.getMonth() + 1} / ${currentDate.getFullYear()}`;

	const [date, setDate] = useState<Date | undefined>(new Date());

	// const tiposDocumentos: DocumentType[] = DocumentTypes();


	const fileInput = useRef(null);

	const handleClick = () => {
		//@ts-ignore
		fileInput.current.click();
	};

	return (
		<div className="flex h-[140%] w-[90%] flex-row">
			<div className="flex h-[100%] w-[25%] flex-col items-center">
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
					<div className="w-69">
						<Image
							src={form_children}
							className="w-[100%] rounded-lg pb-4"
							alt=""
						/>
						<div>
							<input
								type="file"
								ref={fileInput}
								style={{ display: "none" }}
							/>
							<div
								style={{ cursor: "pointer" }}
								className="flex h-14 flex-row items-center justify-center gap-5 rounded-lg bg-[#C5CD3C]"
								onClick={handleClick}
							>
								<Camera size={48} color={"white"} />
								<div className="font-primary text-2xl text-white">
									Subir Foto
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex w-[90%] flex-col  gap-8 pl-8 pt-16">
				<div className="flex w-[90%] flex-row justify-between">
					<div className="flex w-[80%] flex-col gap-3 rounded-lg">
						<Label htmlFor="email">NOMBRES</Label>

						<Input
							type="text"
							id="names"
							valid={!errors.names}
							placeholder="Type Here"
							value={values.names}
							onChange={handleChange}
						/>
					</div>
					<div className="flex w-[15%] flex-col gap-3">
						<Label htmlFor="email">TIPO DE SANGRE</Label>
						<Select
							value={values.blood_type}
							onValueChange={(value) => {
								setFieldValue("blood_type", value);
							}}
						>
							<SelectTrigger
								id="blood_type"
								className="h-16 rounded-lg border-2 focus:border-primary"
							>
								<SelectValue placeholder="O+" />
							</SelectTrigger>
							<SelectContent className="focus:border-primary">
								<SelectGroup>
									<SelectItem value="A+">A+</SelectItem>
									<SelectItem value="A-">A-</SelectItem>
									<SelectItem value="B+">B+</SelectItem>
									<SelectItem value="B-">B-</SelectItem>
									<SelectItem value="AB+">AB+</SelectItem>
									<SelectItem value="AB-">AB-</SelectItem>
									<SelectItem value="O+">O+</SelectItem>
									<SelectItem value="O-">O-</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</div>
				<div className="flex w-[100%] flex-row gap-x-8">
					<div className="flex w-72 flex-col gap-8">
						<div className="flex flex-col gap-3 rounded-lg">
							<Label htmlFor="email">PRIMER APELLIDO</Label>
							<Input
								className="h-16"
								type="text"
								id="first_last_name"
								valid={!errors.first_last_name}
								placeholder="Type Here"
								value={values.first_last_name}
								onChange={handleChange}
							/>
						</div>
						<div className="flex flex-1 flex-col gap-3">
							<Label htmlFor="email">IDENTIFICACIÓN</Label>
							{
							<Select
							value={values.identification_type_id.description}
							onValueChange={(value) => {
								setFieldValue("identification_type_id.description", value);
							}}
							>
							<SelectTrigger
								className="h-16 rounded-lg border-2 focus:border-primary"
								id="identification_type_id"
							>
								<SelectValue placeholder="TI" />
							</SelectTrigger>
							<SelectContent className="focus:border-primary">
								<SelectGroup>
								<SelectItem value="TI">TI</SelectItem>
								</SelectGroup>
							</SelectContent>
							</Select>
							/* <Select
							value={values.identification_type_id.description}
							onValueChange={(value) => {
								setFieldValue("identification_type_id.description", value);
							}}
							>
							<SelectTrigger
								className="h-16 rounded-lg border-2 focus:border-primary"
								id="identification_type_id"
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
						<div className="flex flex-col gap-4">
							<Label htmlFor="email">FECHA DE NACIMIENTO</Label>
							<Calendar
								id="birthdate"
								mode="single"
								weekStartsOn={1}
								locale={customEsLocale}
								captionLayout="dropdown-buttons"
								fromYear={1990}
								toYear={2024}
								selected={date}
								onSelect={async (date) => {
									const formattedDate = date
										?.toISOString()
										.split("T")[0];
									await setFieldValue(
										"birthdate",
										formattedDate
									);
									setDate(date);
								}}
								className="w-72 rounded-lg border-gray-300 bg-white shadow-lg "
							/>
						</div>
					</div>

					<div className="flex w-[60%] flex-col gap-8">
						<div className="flex flex-col gap-3 rounded-lg">
							<Label htmlFor="email">SEGUNDO APELLIDO</Label>
							<Input
								className="h-16"
								type="text"
								id="second_last_name"
								valid={!errors.second_last_name}
								placeholder="Type Here"
								value={values.second_last_name}
								onChange={handleChange}
							/>
						</div>
						<div className="flex flex-col gap-3 rounded-lg">
							<Label htmlFor="email">NÚMERO DE DOCUMENTO</Label>
							<Input
								className="h-16"
								type="text"
								id="personal_id"
								valid={!errors.personal_id}
								placeholder="Type Here"
								value={values.personal_id}
								onChange={handleChange}
							/>
						</div>
						<div className="flex flex-col gap-3 rounded-lg">
							<Label htmlFor="email">ENTIDAD DE SALUD</Label>
							<Input
								className="h-16"
								type="text"
								id="health_entity"
								valid={!errors.health_entity}
								placeholder="Type Here"
								value={values.health_entity}
								onChange={handleChange}
							/>
						</div>
						<div className="flex flex-col gap-3 rounded-lg">
							<Label htmlFor="email">INSTITUCIONES</Label>
							<Input
								className="h-16"
								type="text"
								valid={!errors.institution_name}
								id="institution_name"
								placeholder="Type Here"
								value={values.institution_name}
								onChange={handleChange}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
