// components/HousingInfoModal.tsx
import React, { useState, useEffect } from "react";
import { Departments } from "@/api/user/departments";
import { Cities } from "@/api/user/cities";
import { SocioeconimicStatus } from "@/api/user/socioeconomicStatus";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem
} from "@/components/ui/select"; // Reemplaza con tu biblioteca de UI

interface HousingInfoModalProps {
    isOpen: boolean;
    data: Record<string, any>;
    onClose: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSave: () => void;
}

interface DepartmentI {
    department_id: string;
    department_name: string;
}

interface CityI {
    city_id: string;
    city_name: string;
}

interface SocioeconomicStatusI {
    socioeconomic_status_id: string;
    socioeconomic_status_value: number;
}

const HousingInfoModal: React.FC<HousingInfoModalProps> = ({
    isOpen,
    data,
    onClose,
    onChange,
    onSave
}) => {
    const departments: DepartmentI[] = Departments();
    const [selectedDepartment, setSelectedDepartment] = useState<string>(data.region || "");

    const cities: CityI[] = Cities(selectedDepartment);

    const socioeconomicStatus: SocioeconomicStatusI[] = SocioeconimicStatus();
    const [selectedSocioeconomicStatus, setSelectedSocioeconomicStatus] = useState<string>(data.socioeconomic_status_value?.toString() || "");

    useEffect(() => {
        if (data.socioeconomic_status_value) {
            const selectedSocioeconomic = socioeconomicStatus.find(status => status.socioeconomic_status_value === data.socioeconomic_status_value);
            if (selectedSocioeconomic) {
                setSelectedSocioeconomicStatus(selectedSocioeconomic.socioeconomic_status_value.toString());
            }
        }
    }, [data.socioeconomic_status_value, socioeconomicStatus]);

    useEffect(() => {
        if (data.region) {
            const selectedDept = departments.find(dept => dept.department_name === data.region);
            if (selectedDept) {
                setSelectedDepartment(selectedDept.department_id);
            }
        }
    }, [data.region, departments]);

    const handleDepartmentChange = (value: string) => {
        onChange({ target: { name: "region", value } } as React.ChangeEvent<HTMLSelectElement>);

        const selectedDept = departments.find(dept => dept.department_name === value);
        if (selectedDept) {
            setSelectedDepartment(selectedDept.department_id);
        }
    };

    const handleSocioeconomicStatusChange = (value: string) => {
        onChange({ target: { name: "socioeconomic_status_value", value } } as React.ChangeEvent<HTMLSelectElement>);
        setSelectedSocioeconomicStatus(value);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
                <h2 className="text-lg font-bold mb-4">Editar Información de Vivienda</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex w-full flex-col gap-3 rounded-lg">
                        <label htmlFor="country">País</label>
                        <Select
                            value={data.country}
                            onValueChange={(value) => onChange({ target: { name: "country", value } } as React.ChangeEvent<HTMLSelectElement>)}
                        >
                            <SelectTrigger className="h-16 rounded-lg border-2 focus:border-primary" id="country">
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent className="focus:border-primary">
                                <SelectGroup>
                                    <SelectItem value="COLOMBIA">COLOMBIA</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex w-full flex-col gap-3 rounded-lg">
                        <label htmlFor="department">Departamento</label>
                        <Select
                            value={data.region}
                            onValueChange={handleDepartmentChange}
                        >
                            <SelectTrigger className="h-16 rounded-lg border-2 focus:border-primary" id="department">
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent className="focus:border-primary">
                                <SelectGroup>
                                    {departments.map((department) => (
                                        <SelectItem key={department.department_id} value={department.department_name}>
                                            {department.department_name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex w-full flex-col gap-3 rounded-lg">
                        <label htmlFor="city">Ciudad</label>
                        <Select
                            value={data.city}
                            onValueChange={(value) => onChange({ target: { name: "city", value } } as React.ChangeEvent<HTMLSelectElement>)}
                        >
                            <SelectTrigger className="h-16 rounded-lg border-2 focus:border-primary" id="city">
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent className="focus:border-primary">
                                <SelectGroup>
                                    {Array.isArray(cities) && cities.length === 0 ? (
                                        <SelectItem value="" disabled>Cargando ciudades...</SelectItem>
                                    ) : (
                                        Array.isArray(cities) && cities.map((city) => (
                                            <SelectItem key={city.city_id} value={city.city_name}>
                                                {city.city_name}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Otros campos del formulario */}
                    <label className="block">
                        Dirección:
                        <input
                            className="w-full border rounded p-2"
                            type="text"
                            name="address"
                            value={data.address}
                            onChange={onChange}
                        />
                    </label>
                    <label className="block">
                        Barrio:
                        <input
                            className="w-full border rounded p-2"
                            type="text"
                            name="district_name"
                            value={data.district_name}
                            onChange={onChange}
                        />
                    </label>
                    <label className="block">
                        Comuna:
                        <input
                            className="w-full border rounded p-2"
                            type="text"
                            name="community"
                            value={data.community}
                            onChange={onChange}
                        />
                    </label>
                    <div className="flex w-full flex-col gap-3 rounded-lg">
                        <label htmlFor="socioeconomic_status">Estrato socioeconómico</label>
                        <Select
                            value={selectedSocioeconomicStatus}
                            onValueChange={handleSocioeconomicStatusChange}
                        >
                            <SelectTrigger className="h-16 rounded-lg border-2 focus:border-primary" id="socioeconomic_status">
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent className="focus:border-primary">
                                <SelectGroup>
                                    {socioeconomicStatus.map((status) => (
                                        <SelectItem key={status.socioeconomic_status_id} value={status.socioeconomic_status_value.toString()}>
                                            {status.socioeconomic_status_value}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex w-full flex-col gap-3 rounded-lg">
                        <label htmlFor="housing_type">Tipo de vivienda</label>
                        <Select
                            value={data.description}
                            onValueChange={(value) => onChange({ target: { name: "description", value } } as React.ChangeEvent<HTMLSelectElement>)}
                        >
                            <SelectTrigger className="h-16 rounded-lg border-2 focus:border-primary" id="housing_type">
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent className="focus:border-primary">
                                <SelectGroup>
                                    <SelectItem value="Propia">PROPIA</SelectItem>
                                    <SelectItem value="Alquilada">ALQUILADA</SelectItem>
                                    <SelectItem value="Prestamo">PRÉSTAMO</SelectItem>
                                    <SelectItem value="Comodato">COMODATO</SelectItem>
                                    <SelectItem value="Familiar">FAMILIAR</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex w-full flex-col gap-3 rounded-lg">
                        <label htmlFor="housing_type">Tipo</label>
                        <Select
                            value={data.housing_type}
                            onValueChange={(value) => onChange({ target: { name: "housing_type", value } } as React.ChangeEvent<HTMLSelectElement>)}
                        >
                            <SelectTrigger className="h-16 rounded-lg border-2 focus:border-primary" id="housing_type">
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent className="focus:border-primary">
                                <SelectGroup>
                                    <SelectItem value="Casa">CASA</SelectItem>
                                    <SelectItem value="Apartamento">APARTAMENTO</SelectItem>
                                    <SelectItem value="Cuarto">CUARTO</SelectItem>
                                    <SelectItem value="Otro">OTRO</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <label className="block">
                        Valor alquiler mes:
                        <input
                            className="w-full border rounded p-2"
                            type="text"
                            name="rental_value_month"
                            value={data.rental_value_month}
                            onChange={onChange}
                        />
                    </label>
                    <label className="block">
                        Valor crédito mes:
                        <input
                            className="w-full border rounded p-2"
                            type="text"
                            name="loan_value_month"
                            value={data.loan_value_month}
                            onChange={onChange}
                        />
                    </label>
                    <label className="block">
                        Banco:
                        <input
                            className="w-full border rounded p-2"
                            type="text"
                            name="bank"
                            value={data.bank}
                            onChange={onChange}
                        />
                    </label>
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        className="mr-2 bg-gray-300 text-black px-4 py-2 rounded"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className="bg-[#C5CD3C] text-white px-4 py-2 rounded"
                        onClick={onSave}
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HousingInfoModal;