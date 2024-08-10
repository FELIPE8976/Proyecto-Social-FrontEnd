"use client";

import { beneficiariesInfo } from "@/api/auth/beneficiariesInfo";
import { useBeneficiary } from "@/contexts/BeneficiaryProvider";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { ClipLoader } from "react-spinners";

function BeneficiariesComponent() {
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const { beneficiary, setBeneficiary } = useBeneficiary();
    const beneficiariesPerPage = 9; // 3 columns x 3 rows
    const router = useRouter();
    const { setToken } = useAuth();

    function logout() {
        localStorage.removeItem("token");
        setToken("");
        router.push("/");
    }

    useEffect(() => {
        const fetchBeneficiaries = async () => {
            try {
                const data = await beneficiariesInfo();
                if (data) {
                    setBeneficiaries(data);
                } else {
                    console.error("Error fetching beneficiaries");
                    logout();
                }
            } catch (error) {
                console.error("Error fetching beneficiaries:", error);
                logout();
            } finally {
                setLoading(false);
            }
        };
        fetchBeneficiaries();
    }, []);

    const handleClick = (fullName: string, imageLink: string, id: string) => {
        const beneficiary = {
            fullName,
            imageLink,
            id,
        };

        setBeneficiary(beneficiary);

        router.push("/beneficiariesInfo");
    };

    const indexOfLastBeneficiary = currentPage * beneficiariesPerPage;
    const indexOfFirstBeneficiary = indexOfLastBeneficiary - beneficiariesPerPage;
    const currentBeneficiaries = beneficiaries.slice(indexOfFirstBeneficiary, indexOfLastBeneficiary);
    const totalPages = Math.ceil(beneficiaries.length / beneficiariesPerPage);

    const nextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const goToPage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <ClipLoader size={50} color={"#C5CD3C"} loading={loading} />
            </div>
        );
    }

    return (
        <div className="flex size-full flex-col justify-center bg-white">
            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center size-full">
                {currentBeneficiaries.map((beneficiary, index) => (
                    <div
                        key={index}
                        className="flex w-60 flex-col items-center justify-center p-4 rounded-3xl border-2 border-b shadow-lg"
                    >
                        <img
                            src={beneficiary["Image Link"]}
                            alt="User"
                            width={100}
                            height={100}
                            className="mt-4 rounded-full"
                        />
                        <h2 className="text-center">{beneficiary["Full Name"]}</h2>
                        <p className="mb-2">Doc: {beneficiary["Personal ID"]}</p>
                        <button
                            style={{ color: "#C5CD3C" }}
                            onClick={() =>
                                handleClick(
                                    beneficiary["Full Name"],
                                    beneficiary["Image Link"],
                                    beneficiary["Personal ID"]
                                )
                            }
                        >
                            Ver Perfil
                        </button>
                    </div>
                ))}
            </div>
            <div className="mt-5 flex justify-end pr-4">
                <button
                    style={{ color: "#C5CD3C", marginRight: "8px" }}
                    onClick={prevPage}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        style={{ color: currentPage === index + 1 ? "#C5CD3C" : "#000", marginRight: "8px" }}
                        onClick={() => goToPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    style={{ color: "#C5CD3C" }}
                    onClick={nextPage}
                    disabled={beneficiaries && indexOfLastBeneficiary >= beneficiaries.length}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}

export default BeneficiariesComponent;