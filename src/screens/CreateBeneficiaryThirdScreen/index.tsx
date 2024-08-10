"use client";

import { CreateBeneficiaryLayout } from "@/layouts/CreateBeneficiaryLayout";
import { CreateBeneficiaryThirdForm } from "@/screens/CreateBeneficiaryThirdScreen/CreateBeneficiaryThirdForm";

export default function CreateBeneficiaryThirdScreen() {
	const nextRoute = "/crear-beneficiario/cuarto-paso";

	return (
		<CreateBeneficiaryLayout nextRoute={nextRoute} progress={3}>
			<CreateBeneficiaryThirdForm />
		</CreateBeneficiaryLayout>
	);
}
