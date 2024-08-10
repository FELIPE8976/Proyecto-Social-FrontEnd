"use client";

import { loginRequest } from "@/api/auth/loginRequest";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthProvider";
import { set } from "date-fns";
import { Field, Form, Formik } from "formik";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import { ClipLoader, PacmanLoader } from "react-spinners";

type Props = {
	name: string;
	id: string;
	children: React.ReactNode;
	open: boolean;
	setOpen: (open: boolean) => void;
};

export function LoginModal({ name, id, children, open, setOpen }: Props) {
	const [loading, setLoading] = useState(false);
	const [failed, setFailed] = useState(false);
	const [data, setData] = useState<any>(null);
	const { setToken } = useAuth();

	useEffect(() => {
		setLoading(false);
		if (data && data === "Invalid credentials") {
			setFailed(true);
		} else if (data && data.token) {
			setToken(data.token);
			router.push("/allBeneficiaries");
		}
	}, [data]);

	const handleSubmit = async (values: any) => {
		setLoading(true);
		setFailed(false);
		const response = await loginRequest({
			identifier: id,
			password: values.password,
		});
		setData(response);
		setLoading(false);
	};

	const router = useRouter();

	return (
		<Dialog open={open}>
			{children}
			<DialogContent className="h-96 w-[100%] items-center justify-center rounded-3xl bg-white">
				<div className="flex flex-col gap-5 text-center text-lg font-bold">
					<div className="text-3xl">
						Bienvenido,
						<br />
						{name}
					</div>
					<Formik
						initialValues={{ password: "" }}
						onSubmit={(values) => handleSubmit(values)}
					>
						<>
							<div className="flex flex-col gap-5">
								{failed ? (
									<div className="text-lg font-bold text-red-500">
										Credenciales inválidas
									</div>
								) : (
									<></>
								)}
								<Form className="flex flex-col items-center justify-center gap-5">
									<Field
										type="password"
										name="password"
										placeholder="INGRESAR CONTRASEÑA"
										className="h-12 w-96 rounded-full border-2 border-primary px-4 drop-shadow-lg  placeholder:text-center placeholder:font-bold placeholder:text-primary focus:outline-[#1bc7eb]"
									/>
									<Button
										type="submit"
										className="text-md h-12 w-52 rounded-3xl font-bold drop-shadow-xl hover:bg-[#1bc7eb]"
									>
										{loading ? (
											<ClipLoader
												color={"white"}
												size={10}
												loading={loading}
												aria-label="Loading Spinner"
												data-testid="loader"
											/>
										) : (
											"INICIAR SESIÓN"
										)}
									</Button>
								</Form>
							</div>
						</>
					</Formik>
					<button
						onClick={() => {
							setOpen(false);
						}}
					>
						<div className="text-green flex items-center justify-center gap-2">
							<ArrowLeftIcon color="#C5CD3C" />
							<div className="text-[#C5CD3C]">Volver</div>
						</div>
					</button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
