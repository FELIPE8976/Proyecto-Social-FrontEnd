import * as yup from "yup";

export const CreateBeneficiaryFirstFormValidationSchema = yup.object().shape({
	names: yup.string().required(),
	blood_type: yup.string().required(),
	first_last_name: yup.string().required(),
	second_last_name: yup.string().required(),
	identification_type_id: yup.object().shape({
		identification_type_id: yup.string().required(),
		description: yup.string().required(),
	}),
	personal_id: yup.string().required(),
	birthdate: yup.date().required(),
	health_entity: yup.string().required(),
	institution_name: yup.string().required(),
});
