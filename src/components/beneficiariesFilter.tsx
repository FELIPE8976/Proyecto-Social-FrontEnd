"use client";

import { beneficiariesInfo } from "@/api/auth/beneficiariesInfo";
import { useBeneficiary } from "@/contexts/BeneficiaryProvider";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

interface Beneficiario {
    "Full Name": string;
    "Personal ID": string;
    "Image Link": string;
}

interface SearchFilterProps {
    searchTerm: string;
}

const ITEMS_PER_PAGE = 9;

const SearchFilter: React.FC<SearchFilterProps> = ({ searchTerm }) => {
    const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([]);
    const [searchResults, setSearchResults] = useState<Beneficiario[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const { beneficiary, setBeneficiary } = useBeneficiary();
    const router = useRouter();

    useEffect(() => {
        const fetchBeneficiarios = async () => {
            try {
                const data = await beneficiariesInfo();
                if (data) {
                    setBeneficiarios(data);
                } else {
                    console.error("Error fetching beneficiaries");
                }
            } catch (error) {
                console.error("Error fetching beneficiaries:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBeneficiarios();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() !== "") {
            const filteredBeneficiarios = beneficiarios.filter(
                (beneficiario) =>
                    beneficiario["Full Name"]
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    beneficiario["Personal ID"]
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    beneficiario["Image Link"]
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
            );
            setSearchResults(filteredBeneficiarios);
            setCurrentPage(1); // Reset to first page on new search
        } else {
            setSearchResults([]);
            setCurrentPage(1); // Reset to first page when search term is cleared
        }
    }, [searchTerm, beneficiarios]);

    const handleClick = (fullName: string, imageLink: string, id: string) => {
        const beneficiary = {
            fullName,
            imageLink,
            id,
        };

        setBeneficiary(beneficiary);
        router.push("/beneficiariesInfo");
    };

    const totalPages = Math.ceil(searchResults.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentResults = searchResults.slice(startIndex, endIndex);

    const prevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const nextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const goToPage = (page: number) => {
        setCurrentPage(page);
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
                {currentResults.map((beneficiario, index) => (
                    <div
                        key={index}
                        className="flex w-60 flex-col items-center justify-center rounded-3xl border-2 border-b shadow-lg"
                    >
                        <img
                            src={beneficiario["Image Link"]}
                            alt="User"
                            width={100}
                            height={100}
                            className="mt-4 rounded-full"
                        />
                        <h2>{beneficiario["Full Name"]}</h2>
                        <p className="mb-2">Doc: {beneficiario["Personal ID"]}</p>
                        <button
                            style={{ color: "#C5CD3C" }}
                            onClick={() =>
                                handleClick(
                                    beneficiario["Full Name"],
                                    beneficiario["Image Link"],
                                    beneficiario["Personal ID"]
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
                    disabled={currentPage === totalPages}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default SearchFilter;