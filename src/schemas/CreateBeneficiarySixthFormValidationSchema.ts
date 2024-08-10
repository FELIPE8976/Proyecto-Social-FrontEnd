import * as Yup from "yup";

export const CreateBeneficiarySixthFormValidationSchema = Yup.object().shape({
	referral_cause: Yup.string().required("Referral cause is required"),
	support_request: Yup.string().required("Support request is required"),
	observations: Yup.string().required("Observations are required"),
});
