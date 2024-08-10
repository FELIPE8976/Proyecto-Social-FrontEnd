import * as Yup from "yup";

const familyMember = Yup.object().shape({
	full_name: Yup.string().required(),
	age: Yup.number().required(),
	relationship: Yup.string().required(),
	occupation: Yup.string().required(),
	education_level: Yup.string().required(),
	monthly_income: Yup.number(),
	document_type: Yup.string().required(),
	document_number: Yup.string().required(),
});

export const CreateBeneficiaryFifthFormValidationSchema = Yup.object().shape({
	family_members: Yup.array().of(familyMember).required(),
	total_monthly_income: Yup.number().required(),
});
