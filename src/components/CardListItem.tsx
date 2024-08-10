import { useState } from "react";
import FamilyMemberModal from "@/components/FamilyMemberModal";
import Image from "next/image";
import logoPerfil from '@/assets/logoPerfil.png';

type CardListItemProps = {
    name: string;
    relationship: string;
    age: number;
    education: string;
    occupation: string;
    income: number;
    document_type: string;
    document_number: string;
    
}

const CardListItem = ({ name, age, education, occupation, income, relationship, document_type, document_number }: CardListItemProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <div className="flex items-center justify-between p-2">
        <div className="flex items-center space-x-4">
            <div>
                <p className="font-medium font-primary text-[#C5CD3C]">{name}</p>
                <p className="text-sm font-primary text-muted-foreground">{relationship}</p>
            </div>
        </div>
        <div className="inline-flex items-center">
            <button
                onClick={() => setModalOpen(true)}
                className="flex items-center space-x-2 rounded-full bg-white border-2 border-gray-200 p-2 hover:bg-gray-100 focus:outline-none"
            >
                <Image src={logoPerfil} alt="logoP" width={20} height={20} />
                <span className="font-primary font-bold text-sm text-[#57D6F0]">Ver Perfil</span>
            </button>
        </div>
        <FamilyMemberModal 
            name={name}
            age={age}
            education={education}
            occupation={occupation}
            income={income}
            relationship={relationship}
            document_type={document_type}
            document_number={document_number}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
        />
    </div>
  );
}

export default CardListItem;
