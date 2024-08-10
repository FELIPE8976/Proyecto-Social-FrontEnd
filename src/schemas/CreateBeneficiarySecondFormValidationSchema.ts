import * as Yup from "yup";


const socioeconomic_status_id = Yup.object().shape({
	socioeconomic_status_id: Yup.string().required(),
	socioeconomic_status_value: Yup.number().required(),
});

export const CreateBeneficiarySecondFormValidationSchema = Yup.object().shape({
	interviewed_person_names: Yup.string().required(),
	interviewed_person_first_last_name: Yup.string().required(),
	interviewed_person_second_last_name: Yup.string().required(),
	relationship: Yup.string().required(),
	interviewed_person_id_type: Yup.string().required(),
	interviewed_person_id: Yup.string().required(),
	address: Yup.string().required(),
	district: Yup.string().required(),
	socioeconomic_status_id: socioeconomic_status_id,
	country: Yup.string().required(),
	department: Yup.string().required(),
	city: Yup.string().required(),
	community: Yup.string().required(),
	first_phone_number: Yup.string().required(),
	second_phone_number: Yup.string().required(),
	third_phone_number: Yup.string().required(),
});
