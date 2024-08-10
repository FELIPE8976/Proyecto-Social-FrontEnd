"use client";

import { CreateBeneficiaryLayout } from "@/layouts/CreateBeneficiaryLayout";
import { CreateBeneficiaryFourthForm } from "@/screens/CreateBeneficiaryFourthScreen/CreateBeneficiaryFourthForm";

export default function CreateBeneficiaryFourthScreen() {
	const nextRoute = "/crear-beneficiario/quinto-paso";

	return (
		<CreateBeneficiaryLayout nextRoute={nextRoute} progress={4}>
			<CreateBeneficiaryFourthForm />
		</CreateBeneficiaryLayout>
	);
}
