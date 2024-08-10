"use client";

import { additionalInfo } from "@/api/auth/additionalInfo";
import { familyMembers } from "@/api/auth/familyMembers";
import { housingInfo } from "@/api/auth/housingInfo";
import heartIcon from "@/assets/heartIcon.png";
import FamilyMembers from "@/components/FamilyMembers";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import ImageInfo from "@/components/imageInfo";
import { useBeneficiary } from "@/contexts/BeneficiaryProvider";
import { formatCurrency } from "@/helpers";
import { HeaderLayout } from "@/layouts/HeaderLayout";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import HousingInfoModal from "@/components/HousingInfoModal";

export default function Nueva() {
    const { beneficiary } = useBeneficiary();
    const beneficiaryName = beneficiary?.fullName || "";
    const beneficiaryImageLink = beneficiary?.imageLink || "";
    const beneficiaryID = beneficiary?.id || "";

    const [beneficiariosAdd, setBeneficiariosAdd] = useState<Record<string, any>>({});
    const [beneficiariosHousing, setBeneficiariosHousing] = useState<Record<string, any>>({});
    const [adicional, setAdicional] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [alertShown, setAlertShown] = useState(false);

    const [isModalOpen, setModalOpen] = useState(false);
    const [editableData, setEditableData] = useState<Record<string, any>>({});

    const router = useRouter();

    useEffect(() => {
        const storedBeneficiaryID = beneficiaryID || localStorage.getItem('beneficiaryID');
        
        if (storedBeneficiaryID) {
            localStorage.setItem('beneficiaryID', storedBeneficiaryID);

            const fetchData = async () => {
                try {
                    setLoading(true);
                    const [familyAdd, familyData, housingData] = await Promise.all([
                        additionalInfo(storedBeneficiaryID),
                        familyMembers(storedBeneficiaryID),
                        housingInfo(storedBeneficiaryID),
                    ]);
                    setAdicional(familyAdd);
                    setBeneficiariosAdd(familyData);
                    setBeneficiariosHousing(housingData);
                    setEditableData(housingData);
                } catch (err) {
                    setError(err as Error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        } else {
            setError(new Error("Beneficiary ID is missing"));
        }
    }, [beneficiaryID]);

    const handleClick = () => {
        router.push("/allBeneficiaries");
    };

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditableData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = () => {
        console.log(editableData);
        handleCloseModal();
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <ClipLoader size={50} color={"#2997B3"} loading={loading} />
            </div>
        );
    }

    if (error && !alertShown) {
        alert("Ocurrió un error. Redirigiendo a todos los beneficiarios.");
        setAlertShown(true);
        return router.push("/allBeneficiaries");
    }

    return (
        <ProtectedRoute>
            <HeaderLayout>
                <div className="mx-auto mb-12 mt-4 grid h-fit w-11/12 grid-cols-1 md:grid-cols-3 gap-4 rounded-3xl">
                    <div className="mr-4 h-fit">
                        <div className="relative mb-4 flex h-60 justify-center gap-y-5 rounded-2xl border-2 border-b bg-white">
                            <ImageInfo
                                name={beneficiaryName}
                                linkImage={beneficiaryImageLink}
                            />
                        </div>
                        <div className="relative mb-4 flex h-70 justify-center gap-y-5 rounded-2xl border-2 border-b bg-white">
                            <FamilyMembers beneficiaryId={beneficiaryID} />
                        </div>
                        <div className="relative flex h-30 flex-col gap-y-2 rounded-2xl border-2 border-b bg-white p-4 overflow-y-auto">
                            <p>Persona Entrevistada: Juan Perez</p>
                            <p>Cedula: 10084638</p>
                        </div>
                    </div>
                    <div className="mr-4 h-fit">
                        <div className="relative mb-4 flex h-72 flex-col gap-y-3 rounded-2xl border-2 border-b bg-white overflow-y-auto">
                            <h1 className="text-center font-secondary text-lg font-bold text-[#2997B3]">
                            SOBRE EL BENEFICIARIO
                            </h1>
                            <p className="ml-3">
                            Tipo de sangre: {beneficiariosAdd["blood_type"]}
                            </p>
                            <p className="ml-3">
                            Edad: {beneficiariosAdd["age"]}
                            </p>
                            <p className="ml-3">
                            Fecha de nacimiento: {beneficiariosAdd["birthdate"]}
                            </p>
                            <p className="ml-3">ID: {beneficiaryID}</p>
                            <p className="ml-3">
                            Teléfonos: {Array.isArray(beneficiariosAdd["phones"])
                                ? beneficiariosAdd["phones"].join(", ")
                                : beneficiariosAdd["phones"]}
                            </p>
                            <p className="ml-3">
                            Entidad de salud: {beneficiariosAdd["health_entity"]}
                            </p>
                            <p className="ml-3">
                            Institución: {beneficiariosAdd["entity_organization"]}
                            </p>
                        </div>
                        <div className="relative flex h-72 flex-col rounded-2xl border-2 border-b bg-white overflow-y-auto p-4">
                            <h1 className="text-center font-secondary text-lg font-bold text-[#2997B3]">
                                INFORMACIÓN DE VIVIENDA
                            </h1>
                            <p className="ml-3 text-sm">
                                País: {beneficiariosHousing["country"]}
                            </p>
                            <p className="ml-3 text-sm">
                                Ciudad: {beneficiariosHousing["city"]}
                            </p>
                            <p className="ml-3 text-sm">
                                Departamento: {beneficiariosHousing["region"]}
                            </p>
                            <p className="ml-3 text-sm">
                                Dirección: {beneficiariosHousing["address"]}
                            </p>
                            <p className="ml-3 text-sm">
                                Barrio: {beneficiariosHousing["district_name"]}
                            </p>
                            <p className="ml-3 text-sm">
                                Comuna: {beneficiariosHousing["community"]}
                            </p>
                            <p className="ml-3 text-sm">
                                Estrato socioeconómico:{" "}
                                {
                                    beneficiariosHousing[
                                        "socioeconomic_status_value"
                                    ]
                                }
                            </p>
                            <p className="ml-3 text-sm">
                                Tipo de vivienda:{" "}
                                {beneficiariosHousing["description"]}
                            </p>
                            <p className="ml-3 text-sm">
                                Tipo: {beneficiariosHousing["housing_type"]}
                            </p>
                            <p className="ml-3 text-sm">
                                Valor alquiler mes:{" "}
                                {formatCurrency(
                                    beneficiariosHousing["rental_value_month"]
                                )}
                            </p>
                            <p className="ml-3 text-sm">
                                Valor crédito mes:{" "}
                                {formatCurrency(
                                    beneficiariosHousing["loan_value_month"]
                                )}
                            </p>
                            <p className="ml-3 text-sm">
                                Banco: {beneficiariosHousing["bank"]}
                            </p>
                            <button
                                className="absolute bottom-4 right-4 flex h-8 items-center rounded-lg bg-[#C5CD3C] px-2 text-sm font-bold text-white"
                                onClick={handleOpenModal}
                            >
                                Editar
                            </button>
                        </div>
                    </div>
                   <div className="relative mr-4 flex flex-col gap-y-5 rounded-3xl border-2 border-b bg-white max-h-96 overflow-y-auto">
                        <h1 className="text-center font-secondary font-bold text-[#2997B3]">
                            DX / CAUSA DE REMISIÓN
                        </h1>
                        <p className="ml-3">{adicional["referral_cause"]}</p>
                        <h1 className="text-center font-secondary font-bold text-[#2997B3]">
                            SOLICITUD DE APOYO
                        </h1>
                        <p className="ml-3">{adicional["support_request"]}</p>
                        <h1 className="text-center font-secondary font-bold text-[#2997B3]">
                            OBSERVACIONES
                        </h1>
                        <p className="ml-3">{adicional["observations"]}</p>
                    </div>
                    <div className="flex justify-center md:justify-start w-full col-span-3 md:col-span-1 mt-2 md:mt-0">
                        <button
                            className="flex items-center rounded-lg bg-[#C5CD3C] px-3 py-1 text-sm font-bold text-white w-full md:w-auto"
                            onClick={handleClick}
                        >
                            <div className="flex items-center mr-2">
                            <Image
                                src={heartIcon}
                                alt="Heart"
                                width={24}
                                height={24}
                            />
                            </div>
                            <span className="text-center w-full md:w-auto">Volver a todos los beneficiarios</span>
                        </button>
                    </div>
                </div>
                <HousingInfoModal 
                    isOpen={isModalOpen} 
                    data={editableData} 
                    onClose={handleCloseModal} 
                    onChange={handleChange} 
                    onSave={handleSave} 
                />
            </HeaderLayout>
        </ProtectedRoute>
    );
}