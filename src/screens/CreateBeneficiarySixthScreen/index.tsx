"use client";

import { CreateBeneficiaryLayout } from "@/layouts/CreateBeneficiaryLayout";
import { CreateBeneficiarySixthForm } from "@/screens/CreateBeneficiarySixthScreen/CreateBeneficiarySixthForm";

export default function CreateBeneficiarySixthScreen() {
	const nextRoute = "/crear-beneficiario/primer-paso";

	return (
		<CreateBeneficiaryLayout nextRoute={nextRoute} progress={6}>
			<CreateBeneficiarySixthForm />
		</CreateBeneficiaryLayout>
	);
}
