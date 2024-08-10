"use client";

import { CreateBeneficiaryLayout } from "@/layouts/CreateBeneficiaryLayout";
import { CreateBeneficiarySecondForm } from "@/screens/CreateBeneficiarySecondScreen/CreateBeneficiarySecondForm";

export default function CreateBeneficiarySecondScreen() {
	const nextRoute = "/crear-beneficiario/tercer-paso";

	return (
		<CreateBeneficiaryLayout nextRoute={nextRoute} progress={2}>
			<CreateBeneficiarySecondForm />
		</CreateBeneficiaryLayout>
	);
}
