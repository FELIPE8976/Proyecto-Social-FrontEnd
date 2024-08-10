"use client";

import { userLogin } from "@/api/auth/userLogin";
import { LoginModal } from "@/components/LoginModal";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import { useAuth } from "@/contexts/AuthProvider";
import { HeaderLayout } from "@/layouts/HeaderLayout";
import { es as esLocale } from "date-fns/locale";
import { Field, Form, Formik } from "formik";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLayoutEffect } from "react";
import { ClipLoader, PacmanLoader } from "react-spinners";

export default function Home() {
	const [pressedButton, setPressedButton] = useState(false);
	const [loading, setLoading] = useState(false);
	const [failed, setFailed] = useState(false);
	const [data, setData] = useState<any>(null);
	const [id, setId] = useState("");
	const [open, setOpen] = useState(false);

	const router = useRouter();

	const { isAuthenticated } = useAuth();

	useLayoutEffect(() => {
		if (isAuthenticated) {
			router.push("/allBeneficiaries");
		}
	}, [isAuthenticated, router]);

	useEffect(() => {
		setLoading(false);

		if (data && data.message === "Name not found") {
			setFailed(true);
		} else if (data && data.name) {
			setOpen(true);
		}
	}, [data]);

	const handleSubmit = async (values: any) => {
		setLoading(true);
		setFailed(false);
		const response = await userLogin(values.identification);
		setId(values.identification);
		setData(response);
		setLoading(false);
	};

	return (
		<LoginModal name={data?.name} id={id} open={open} setOpen={setOpen}>
			<HeaderLayout>
				<div className="relative flex w-full flex-col items-center">
					<div className="mt-32 flex w-[50%] flex-col items-center gap-7 self-center justify-self-center text-center">
						<div className="text-4xl font-secondary font-bold">
							BIENVENIDOS A LA APLICACIÓN
						</div>
						<div className="text-sm">
							
						</div>
						<div className="z-0">
							<Carousel />
						</div>
						{!pressedButton ? (
							<Button
								onClick={() => setPressedButton(true)}
								className="text-md z-10 h-12 w-52 rounded-3xl font-bold drop-shadow-xl hover:bg-[#1bc7eb]"
							>
								INICIAR SESIÓN
							</Button>
						) : (
							<Formik
								initialValues={{ identification: "" }}
								onSubmit={handleSubmit}
							>
								<Form className="flex items-center justify-center gap-5">
									{failed ? (
										<div className="text-lg font-bold text-red-500">
											Credenciales inválidas
										</div>
									) : (
										<div className="text-lg font-bold text-primary">
											&nbsp;
										</div>
									)}
									<Field
										type="text"
										name="identification"
										placeholder="INGRESAR IDENTIFICACIÓN"
										className="z-10 h-12 w-80 rounded-full border-2 border-primary px-4 placeholder:text-center placeholder:font-bold placeholder:text-primary focus:outline-[#1bc7eb]"
									/>
									<Button
										type="submit"
										className="text-md z-10 h-12 w-12 rounded-full font-bold drop-shadow-xl hover:bg-[#1bc7eb]"
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
											<ArrowRight />
										)}
									</Button>
								</Form>
							</Formik>
						)}
					</div>
				</div>
			</HeaderLayout>
		</LoginModal>
	);
}
