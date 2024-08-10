"use client";

import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type Beneficiary = {
	fullName: string;
	imageLink: string;
	id: string;
};

type BeneficiaryContextType = {
	beneficiary: Beneficiary | null;
	setBeneficiary: (beneficiary: Beneficiary) => void;
};

const BeneficiaryContext = createContext<BeneficiaryContextType | undefined>(
	undefined
);

type BeneficiaryProviderProps = {
	children: ReactNode;
};

export function BeneficiaryProvider({ children }: BeneficiaryProviderProps) {
	const [beneficiary, setBeneficiary] = useState<Beneficiary | null>(null);

	return (
		<BeneficiaryContext.Provider value={{ beneficiary, setBeneficiary }}>
			{children}
		</BeneficiaryContext.Provider>
	);
}

export const useBeneficiary = (): BeneficiaryContextType => {
	const context = useContext(BeneficiaryContext);
	if (!context) {
		throw new Error(
			"useBeneficiary must be used within a BeneficiaryProvider"
		);
	}
	return context;
};
