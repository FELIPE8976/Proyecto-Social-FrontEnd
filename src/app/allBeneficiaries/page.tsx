"use client";

import heartIcon from "@/assets/heartIcon.png";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import SearchFilter from "@/components/beneficiariesFilter";
import BeneficiariosComponent from "@/components/beneficiariesPaging";
import { Button } from "@/components/ui/button";
import { HeaderLayout } from "@/layouts/HeaderLayout";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Beneficiaries() {
	const router = useRouter();

	const [searchTerm, setSearchTerm] = useState("");
	const [searchPerformed, setSearchPerformed] = useState(false);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
		setSearchPerformed(false);
	};

	const handleClick = () => {
		router.push("/crear-beneficiario/primer-paso");
	};

	const handleSearch = () => {
		setSearchPerformed(true);
	};

	return (
		<ProtectedRoute>
			<HeaderLayout>
				<div className="mx-auto mb-12 w-full max-w-4xl gap-y-5 rounded-3xl bg-white p-8">
					<div className="w-full bg-white">
						<div className="flex justify-end">
							<button
								className="flex h-8 items-center rounded-lg bg-[#C5CD3C] px-2 text-sm font-bold text-white"
								style={{ marginTop: "1rem", minWidth: "200px" }}
								onClick={handleClick}
							>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										marginRight: "2px",
									}}
								>
									<Image
										src={heartIcon}
										alt="Heart"
										width={40}
										height={40}
									/>
								</div>
								Añadir Beneficiario
							</button>
						</div>
						<div>
							<p className="text-lg font-bold">
								Todos los beneficiarios
							</p>
						</div>
						<div className="mt-4 flex flex-row items-center">
							<p className="text-sm">Buscar beneficiario:</p>
							<input
								className="ml-4 w-2/3 rounded-3xl border-2 p-2"
								type="text"
								placeholder=" "
								value={searchTerm}
								onChange={handleSearchChange}
							/>
							<Button
								type="submit"
								className="ml-4 h-8 rounded-3xl px-4 text-sm font-bold hover:bg-[#1bc7eb]"
								onClick={handleSearch}
							>
								<svg
									className="h-4 w-4"
									viewBox="0 0 24 24"
									strokeWidth="2"
									stroke="currentColor"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" />
									<circle cx="10" cy="10" r="7" />
									<line x1="21" y1="21" x2="15" y2="15" />
								</svg>
								Buscar
							</Button>
						</div>
					</div>
					<div className="mt-4 flex justify-center">
						{!searchPerformed && <BeneficiariosComponent />}
						{searchPerformed && (
							<SearchFilter searchTerm={searchTerm} />
						)}
					</div>
				</div>
			</HeaderLayout>
		</ProtectedRoute>
	);
}
