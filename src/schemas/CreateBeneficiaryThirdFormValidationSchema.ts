import * as Yup from "yup";

export const CreateBeneficiaryThirdFormValidationSchema = Yup.object().shape({
	housing_type: Yup.object()
		.shape({
			housing_type: Yup.string().required(),
			description: Yup.string().required(),
			rental_value_month: Yup.number().required(),
			loan_value_month: Yup.number().required(),
			bank: Yup.string().required(),
		})
		.required(),
});
