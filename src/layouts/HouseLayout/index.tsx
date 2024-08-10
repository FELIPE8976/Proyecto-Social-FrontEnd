"use client";

import { createBeneficiary } from "@/api/createBeneficiary";
import { useKeyValue } from "@/contexts/CreateBeneficiaryProvider";
import { HouseButtons } from "@/layouts/HouseLayout/HouseButtons";
import { InvalidHouseProgressBar } from "@/layouts/HouseLayout/HouseProgressBar/InvalidHouseProgressBar";
import { ValidHouseProgressBar } from "@/layouts/HouseLayout/HouseProgressBar/ValidHouseProgressBar";
import { HouseRoof } from "@/layouts/HouseLayout/HouseRoof";
import { CreateBeneficiaryFifthFormValidationSchema } from "@/schemas/CreateBeneficiaryFifthFormValidationSchema";
import { CreateBeneficiaryFirstFormValidationSchema } from "@/schemas/CreateBeneficiaryFirstFormValidationSchema";
import { CreateBeneficiaryFourthFormValidationSchema } from "@/schemas/CreateBeneficiaryFourthFormValidationSchema";
import { CreateBeneficiarySecondFormValidationSchema } from "@/schemas/CreateBeneficiarySecondFormValidationSchema";
import { CreateBeneficiarySixthFormValidationSchema } from "@/schemas/CreateBeneficiarySixthFormValidationSchema";
import { CreateBeneficiaryThirdFormValidationSchema } from "@/schemas/CreateBeneficiaryThirdFormValidationSchema";
import { family_member } from "@/types/CreateBeneficiaryForm";
import "crypto";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { ReactNode, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { Schema } from "yup";

type Route =
	| "/crear-beneficiario/segundo-paso"
	| "/crear-beneficiario/tercer-paso"
	| "/crear-beneficiario/cuarto-paso"
	| "/crear-beneficiario/quinto-paso"
	| "/crear-beneficiario/sexto-paso"
	| "/crear-beneficiario/primer-paso";

type Props = {
	children: ReactNode;
	progress: number;
	nextRoute: Route;
};

export function HouseLayout({ children, progress, nextRoute }: Props) {
	const router = useRouter();
	const { keyValueStore, setKeyValue } = useKeyValue();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formValues, setFormValues] = useState<any>(null);
	const currentDate = new Date();
	const formattedDate = currentDate.toISOString().split("T")[0];
	const identification_type_id = crypto.randomUUID();
	const socioeconomic_status_id = crypto.randomUUID();
	const MAX_RETRIES = 2;
	let attempt = 0;

	const firstFormInitialValues = {
		names: "",
		blood_type: "O+",
		first_last_name: "",
		second_last_name: "",
		identification_type_id: {
			identification_type_id: identification_type_id,
			description: "TI",
		},
		personal_id: "",
		birthdate: formattedDate,
		health_entity: "",
		institution_name: "",
	};

	const secondFormInitialValues = {
		interviewed_person_names: "",
		interviewed_person_first_last_name: "",
		interviewed_person_second_last_name: "",
		interviewed_person_id_type: "CC",
		relationship: "MADRE",
		interviewed_person_id: "",
		address: "",
		district: "",
		community: "1",
		socioeconomic_status_id: {
			socioeconomic_status_id: socioeconomic_status_id,
			socioeconomic_status_value: 1,
		},
		country: "",
		department: "",
		city: "",
		first_phone_number: "",
		second_phone_number: "",
		third_phone_number: "",
	};

	const thirdFormInitialValues = {
		housing_type: {
			housing_type: "Casa",
			description: "Propia",
			rental_value_month: 0,
			loan_value_month: 0,
			bank: "",
		},
	};

	const fourthFormInitialValues = {
		referred_by: "",
		referral_address: "",
		referral_phones: "",
		entity_organization: "",
	};

	const fifthFormInitialValues = {
		family_members: [
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
		],
		total_monthly_income: 0,
	};

	const sixthFormInitialValues = {
		referral_cause: "",
		support_request: "",
		observations: "",
	};

	const formInitialValuesMapping: Record<
		Route,
		| typeof firstFormInitialValues
		| typeof secondFormInitialValues
		| typeof thirdFormInitialValues
		| typeof fourthFormInitialValues
		| typeof fifthFormInitialValues
		| typeof sixthFormInitialValues
	> = {
		"/crear-beneficiario/segundo-paso": firstFormInitialValues,
		"/crear-beneficiario/tercer-paso": secondFormInitialValues,
		"/crear-beneficiario/cuarto-paso": thirdFormInitialValues,
		"/crear-beneficiario/quinto-paso": fourthFormInitialValues,
		"/crear-beneficiario/sexto-paso": fifthFormInitialValues,
		"/crear-beneficiario/primer-paso": sixthFormInitialValues,
	};

	type CreateBeneficiaryFirstFormValidationSchemaType = Schema<any>;
	type CreateBeneficiarySecondFormValidationSchemaType = Schema<any>;
	type CreateBeneficiaryThirdFormValidationSchemaType = Schema<any>;
	type CreateBeneficiaryFourthFormValidationSchemaType = Schema<any>;
	type CreateBeneficiaryFifthFormValidationSchemaType = Schema<any>;
	type CreateBeneficiarySixthFormValidationSchemaType = Schema<any>;

	function CreateBeneficiaryFormValidationSchema({
		CreateBeneficiaryFirstFormValidationSchema,
		CreateBeneficiarySecondFormValidationSchema,
		CreateBeneficiaryThirdFormValidationSchema,
		CreateBeneficiaryFourthFormValidationSchema,
		CreateBeneficiaryFifthFormValidationSchema,
		CreateBeneficiarySixthFormValidationSchema,
	}: {
		CreateBeneficiaryFirstFormValidationSchema: CreateBeneficiaryFirstFormValidationSchemaType;
		CreateBeneficiarySecondFormValidationSchema: CreateBeneficiarySecondFormValidationSchemaType;
		CreateBeneficiaryThirdFormValidationSchema: CreateBeneficiaryThirdFormValidationSchemaType;
		CreateBeneficiaryFourthFormValidationSchema: CreateBeneficiaryFourthFormValidationSchemaType;
		CreateBeneficiaryFifthFormValidationSchema: CreateBeneficiaryFifthFormValidationSchemaType;
		CreateBeneficiarySixthFormValidationSchema: CreateBeneficiarySixthFormValidationSchemaType;
	}) {
		if (nextRoute === "/crear-beneficiario/segundo-paso") {
			return CreateBeneficiaryFirstFormValidationSchema;
		}
		if (nextRoute === "/crear-beneficiario/tercer-paso") {
			return CreateBeneficiarySecondFormValidationSchema;
		}
		if (nextRoute === "/crear-beneficiario/cuarto-paso") {
			return CreateBeneficiaryThirdFormValidationSchema;
		}
		if (nextRoute === "/crear-beneficiario/quinto-paso") {
			return CreateBeneficiaryFourthFormValidationSchema;
		}
		if (nextRoute === "/crear-beneficiario/sexto-paso") {
			return CreateBeneficiaryFifthFormValidationSchema;
		}
		if (nextRoute === "/crear-beneficiario/primer-paso") {
			return CreateBeneficiarySixthFormValidationSchema;
		}
	}

	const handleConfirm = async () => {
		setIsModalOpen(false);
		if (isSubmitting) return;
		setIsSubmitting(true);
		const initialValues = formInitialValuesMapping[nextRoute];
		Object.keys(initialValues).forEach((key) => {
			setKeyValue({
				key,
				value: formValues[key],
			});
		});

		if (nextRoute === "/crear-beneficiario/primer-paso") {
			const payload = {
				personal_id: await keyValueStore.personal_id,
				name: await keyValueStore.names,
				first_last_name: await keyValueStore.first_last_name,
				second_last_name: await keyValueStore.second_last_name,
				institution_name: await keyValueStore.institution_name,
				identification_type_id: await keyValueStore.identification_type_id,
				health_entity: await keyValueStore.health_entity,
				interviewed_person:
					(await keyValueStore.interviewed_person_names) +
					" " +
					(await keyValueStore.interviewed_person_first_last_name) +
					" " +
					(await keyValueStore.interviewed_person_second_last_name),
				relationship: await keyValueStore.relationship,
				interviewed_person_id: await keyValueStore.interviewed_person_id,
				address: await keyValueStore.address,
				district: await keyValueStore.district,
				socioeconomic_status_id: await keyValueStore.socioeconomic_status_id,
				housing_type: await keyValueStore.housing_type,
				referred_by: await keyValueStore.referred_by,
				referral_address: await keyValueStore.referral_address,
				referral_phones: [await keyValueStore.referral_phones],
				entity_organization: await keyValueStore.entity_organization,
				family_members: await keyValueStore.family_members.map(
					(member: family_member) => ({
						...member,
						user_id: keyValueStore.personal_id,
						monthly_income: Number(member.monthly_income),
						age: Number(member.age),
					})
				),
				total_monthly_income: await keyValueStore.total_monthly_income,
				referral_cause: await keyValueStore.referral_cause,
				support_request: await keyValueStore.support_request,
				observations: await keyValueStore.observations,
				blood_type: await keyValueStore.blood_type,
				birthdate: await keyValueStore.birthdate,
				phones: [
					keyValueStore.first_phone_number,
					keyValueStore.second_phone_number,
					keyValueStore.third_phone_number,
				],
				country: await keyValueStore.country,
				department: await keyValueStore.department,
				city: await keyValueStore.city,
				community: await keyValueStore.community,
			};

			while (attempt < MAX_RETRIES) {
				try {
					const response = await createBeneficiary(payload);
					if (response.status === 201) {
						router.push("/allBeneficiaries");
						return; // Salir de la función si la llamada fue exitosa
					} else {
						attempt++;
						setTimeout(() => {
							console.log('Loading...');
						}, 2000);
						setIsSubmitting(false);
						if (attempt === MAX_RETRIES) {
							alert("Ocurrió un error. Vuelva a intentarlo.");
							setIsSubmitting(false);
						}
					}
				} catch (error) {
					attempt++;
					if (attempt === MAX_RETRIES) {
						alert("Ocurrió un error. Vuelva a intentarlo.");
						setIsSubmitting(false);
					}
				} finally {
					if (attempt === MAX_RETRIES) {
						setIsSubmitting(false);
					}
				}
			}
		} else {
			router.push(nextRoute);
			setIsSubmitting(false);
		}
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<div className="flex h-[80rem] w-full flex-col items-center justify-center py-32">
			<HouseRoof />
			<div className="flex w-[80%] flex-col items-center rounded-bl-xl rounded-br-xl rounded-tl-3xl rounded-tr-3xl bg-white shadow-xl">
				<div className="flex w-[100%] flex-col items-center justify-center">
					<Formik
						initialValues={{
							...firstFormInitialValues,
							...secondFormInitialValues,
							...thirdFormInitialValues,
							...fourthFormInitialValues,
							...fifthFormInitialValues,
							...sixthFormInitialValues,
						}}
						validationSchema={CreateBeneficiaryFormValidationSchema(
							{
								CreateBeneficiaryFirstFormValidationSchema,
								CreateBeneficiarySecondFormValidationSchema,
								CreateBeneficiaryThirdFormValidationSchema,
								CreateBeneficiaryFourthFormValidationSchema,
								CreateBeneficiaryFifthFormValidationSchema,
								CreateBeneficiarySixthFormValidationSchema,
							}
						)}
						onSubmit={async (values: { [key: string]: any }) => {
							setFormValues(values);
							if (nextRoute === "/crear-beneficiario/primer-paso") {
								setIsModalOpen(true);
							} else {
								const initialValues = formInitialValuesMapping[nextRoute];
								Object.keys(initialValues).forEach((key) => {
									setKeyValue({
										key,
										value: values[key],
									});
								});
								router.push(nextRoute);
							}
						}}
					>
						{({ isValid, errors }) => {
							if (!isValid) {
								console.log(errors);
							}
							return (
								<Form className="flex w-[100%] flex-col justify-center self-center pb-5">
									<div className="flex w-[100%] flex-col items-center justify-center">
										{isValid ? (
											<ValidHouseProgressBar
												progress={progress}
											/>
										) : (
											<InvalidHouseProgressBar
												progress={progress}
											/>
										)}
										<div className="flex w-[100%] justify-center self-center">
											{children}
										</div>
										<HouseButtons />
									</div>
								</Form>
							);
						}}
					</Formik>
				</div>
			</div>
			<Transition show={isModalOpen} as={Fragment}>
				<Dialog className="relative z-10" onClose={handleCancel}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
						<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
								enterTo="opacity-100 translate-y-0 sm:scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 translate-y-0 sm:scale-100"
								leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							>
								<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
									<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
										<div className="sm:flex sm:items-start">
											<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
												<ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
											</div>
											<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
												<Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
													Confirmación de Creación de Beneficiario
												</Dialog.Title>
												<div className="mt-2">
													<p className="text-sm text-gray-500">
														¿Estás seguro de que deseas crear este beneficiario?
													</p>
												</div>
											</div>
										</div>
									</div>
									<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
										<button
											type="button"
											className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
											onClick={handleConfirm}
										>
											Sí
										</button>
										<button
											type="button"
											className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
											onClick={handleCancel}
										>
											No
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
}