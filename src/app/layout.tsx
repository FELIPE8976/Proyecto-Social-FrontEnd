import { AuthProvider } from "@/contexts/AuthProvider";
import { BeneficiaryProvider } from "@/contexts/BeneficiaryProvider";
import { KeyValueProvider } from "@/contexts/CreateBeneficiaryProvider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import "./globals.css";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "Casa Colombia",
	description: "Sitio Web de Casa Colombia",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<AuthProvider>
			<BeneficiaryProvider>
				<KeyValueProvider>
					<html lang="en">
						<body
							className={cn(
								"min-h-screen bg-background font-sans antialiased",
								fontSans.variable
							)}
						>
							{children}
						</body>
					</html>
				</KeyValueProvider>
			</BeneficiaryProvider>
		</AuthProvider>
	);
}
