"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import React, { lazy } from "react";

export type RouteKeys =
	| "primer-paso"
	| "segundo-paso"
	| "tercer-paso"
	| "cuarto-paso"
	| "quinto-paso"
	| "sexto-paso";

const CreateBeneficiaryFirstScreen = lazy(
	() => import("@/screens/CreateBeneficiaryFirstScreen")
);
const CreateBeneficiarySecondScreen = lazy(
	() => import("@/screens/CreateBeneficiarySecondScreen")
);
const CreateBeneficiaryThirdScreen = lazy(
	() => import("@/screens/CreateBeneficiaryThirdScreen")
);
const CreateBeneficiaryFourthScreen = lazy(
	() => import("@/screens/CreateBeneficiaryFourthScreen")
);
const CreateBeneficiaryFifthScreen = lazy(
	() => import("@/screens/CreateBeneficiaryFifthScreen")
);
const CreateBeneficiarySixthScreen = lazy(
	() => import("@/screens/CreateBeneficiarySixthScreen")
);

const CreateBeneficiaryRoutes: Record<
	RouteKeys,
	React.LazyExoticComponent<React.ComponentType<any>>
> = {
	"primer-paso": CreateBeneficiaryFirstScreen,
	"segundo-paso": CreateBeneficiarySecondScreen,
	"tercer-paso": CreateBeneficiaryThirdScreen,
	"cuarto-paso": CreateBeneficiaryFourthScreen,
	"quinto-paso": CreateBeneficiaryFifthScreen,
	"sexto-paso": CreateBeneficiarySixthScreen,
};

export default function Page({ params }: { params: { formStep: RouteKeys } }) {
	const router = useRouter();
	const ScreenComponent = CreateBeneficiaryRoutes[params.formStep];
	if (!ScreenComponent) {
		router.push("/");
		return <></>;
	}
	return (
		<ProtectedRoute>
			<ScreenComponent />
		</ProtectedRoute>
	);
}
