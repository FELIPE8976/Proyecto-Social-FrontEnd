"use client";

import { CreateBeneficiaryLayout } from "@/layouts/CreateBeneficiaryLayout";
import { CreateBeneficiaryFifthForm } from "@/screens/CreateBeneficiaryFifthScreen/CreateBeneficiaryFifthForm";

export default function CreateBeneficiaryFifthScreen() {
	const nextRoute = "/crear-beneficiario/sexto-paso";

	return (
		<CreateBeneficiaryLayout nextRoute={nextRoute} progress={5}>
			<CreateBeneficiaryFifthForm />
		</CreateBeneficiaryLayout>
	);
}
