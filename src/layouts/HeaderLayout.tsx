"use client";

import User from "@/assets/cat.jpg";
import Door from "@/assets/images/door.png";
import Logo from "@/assets/logo.png";
import { useAuth } from "@/contexts/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export function HeaderLayout({ children }: Props) {
	const router = useRouter();
	const { isAuthenticated, setToken } = useAuth();

	return (
		<div className="top-0 flex flex-col">
			<div className="flex h-32 w-[50%] items-center justify-between self-center  px-4 text-white">
				<Link href="/allBeneficiaries">
					<Image src={Logo} alt="Logo" width={200} height={200} />
				</Link>
				<nav className="flex flex-row items-center justify-center gap-2">
					<a href="/allBeneficiaries" className="mx-2 text-[#C5CD3C]">
						Inicio
					</a>
					<a href="/allBeneficiaries" className="mx-2 text-black">
						Mi Perfil
					</a>
					<div className="rounded-full border-2 border-[#CCCCCC]">
						{isAuthenticated && (
							<Image
								src={User}
								alt="User"
								width={70}
								height={70}
								objectFit="cover"
								className="rounded-full"
							/>
						)}
					</div>
					{isAuthenticated && (
						<button
							onClick={() => {
								setToken("");
								router.push("/");
							}}
							className="flex flex-row items-center justify-center gap-2 align-middle"
						>
							<Image
								src={Door}
								alt="Door"
								width={35}
								height={35}
								objectFit="cover"
								className="rounded-full"
							/>
							<div
								className="secondary-font"
								style={{
									fontSize: "1rem",
									color: "#E80740",
								}}
							>
								Cerrar Sesión
							</div>
						</button>
					)}
				</nav>
			</div>
			<div className="flex h-full bg-[#F1EEEE] pt-5">{children}</div>
		</div>
	);
}
