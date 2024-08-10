"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { HeaderLayout } from "@/layouts/HeaderLayout";
import { HouseLayout } from "@/layouts/HouseLayout";
import type { ReactNode } from "react";

type Route =
	| "/crear-beneficiario/segundo-paso"
	| "/crear-beneficiario/tercer-paso"
	| "/crear-beneficiario/cuarto-paso"
	| "/crear-beneficiario/quinto-paso"
	| "/crear-beneficiario/sexto-paso"
	| "/crear-beneficiario/primer-paso";

type Props = {
	nextRoute: Route;
	progress: number;
	children: ReactNode;
};

export function CreateBeneficiaryLayout({
	nextRoute,
	progress,
	children,
}: Props) {
	return (
		<ProtectedRoute>
			<HeaderLayout>
				<HouseLayout progress={progress} nextRoute={nextRoute}>
					{children}
				</HouseLayout>
			</HeaderLayout>
		</ProtectedRoute>
	);
}
