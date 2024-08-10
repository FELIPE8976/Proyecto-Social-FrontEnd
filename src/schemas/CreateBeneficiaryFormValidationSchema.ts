import { CreateBeneficiaryFirstFormValidationSchema } from "@/schemas/CreateBeneficiaryFirstFormValidationSchema";
import { CreateBeneficiarySecondFormValidationSchema } from "@/schemas/CreateBeneficiarySecondFormValidationSchema";
import * as Yup from "yup";

export const CreateBeneficiaryFormValidationSchema =
	CreateBeneficiaryFirstFormValidationSchema.concat(
		CreateBeneficiarySecondFormValidationSchema
	);
