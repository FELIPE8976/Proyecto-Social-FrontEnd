import * as Yup from "yup";

export const CreateBeneficiaryFourthFormValidationSchema = Yup.object().shape({
	referred_by: Yup.string().required(),
	referral_address: Yup.string().required(),
	referral_phones: Yup.string().required(),
	entity_organization: Yup.string().required(),
});
