"use client";

import { CreateBeneficiaryLayout } from "@/layouts/CreateBeneficiaryLayout";
import { CreateBeneficiaryFirstForm } from "@/screens/CreateBeneficiaryFirstScreen/CreateBeneficiaryFirstForm";

export default function CreateBeneficiaryFirstScreen() {
	const nextRoute = "/crear-beneficiario/segundo-paso";

	return (
		<CreateBeneficiaryLayout nextRoute={nextRoute} progress={1}>
			<CreateBeneficiaryFirstForm />
		</CreateBeneficiaryLayout>
	);
}
