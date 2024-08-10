"use client";

import { useAuth } from "@/contexts/AuthProvider";
import { redirect, useRouter } from "next/navigation";
import { ReactNode, useLayoutEffect } from "react";

type Props = {
	children: ReactNode;
};

export function ProtectedRoute({ children }: Props) {
	const router = useRouter();
	const { isAuthenticated } = useAuth();

	useLayoutEffect(() => {
		if (!isAuthenticated) {
			router.replace("/");
		}
	}, [isAuthenticated, router]);

	if (!isAuthenticated) {
		return null;
	}

	return children;
}
