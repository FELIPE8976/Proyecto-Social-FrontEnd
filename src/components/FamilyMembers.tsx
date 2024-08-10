"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
} from "@/components/ui/defaultCard";
import CardListItem from "@/components/CardListItem";
import { familyMembers } from "@/api/user/familyMembers";
import { formatCurrency } from "@/helpers";
import { useBeneficiary } from "@/contexts/BeneficiaryProvider";

type FamilyMember = {
  age: number;
  education_level: string;
  family_member_id: string;
  full_name: string;
  monthly_income: number | null;
  occupation: string | null;
  relationship: string;
  user_id: string;
  document_type: string;
  document_number: string;
};

type FamilyMembersProps = {
  beneficiaryId: string;
};

const FamilyMembers = ({ beneficiaryId }: FamilyMembersProps) => {
  const [familyMembersList, setFamilyMembersList] = useState<FamilyMember[]>([]);
  const { beneficiary } = useBeneficiary();
  const beneficiaryID = beneficiary?.id || "";

  useEffect(() => {
    // Recuperar el beneficiaryID del localStorage si no está disponible en el contexto
    const storedBeneficiaryID = beneficiaryID || localStorage.getItem("beneficiaryID");

    if (storedBeneficiaryID) {
      localStorage.setItem("beneficiaryID", storedBeneficiaryID);

      const fetchFamilyMembers = async () => {
        try {
          const token = localStorage.getItem("token");
          if (token) {
            const family = await familyMembers(storedBeneficiaryID, token);
            setFamilyMembersList(family.family_members);
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchFamilyMembers();
    } else {
      console.error("Beneficiary ID is missing");
    }
  }, [beneficiaryID]);

  const totalIncome = useMemo(
    () =>
      familyMembersList.reduce(
        (total, member) => (member.monthly_income ?? 0) + total,
        0
      ),
    [familyMembersList]
  );

  return (
    <div className="flex justify-center items-center w-full h-full p-0">
      <div className="w-full max-w-md">
        <Card className="border-none shadow-none">
          <CardHeader className="text-center p-0 m-0">
            <CardTitle className="text-xl font-bold font-secondary text-[#2997B3] mt-0">
              GRUPO FAMILIAR
            </CardTitle>
          </CardHeader>

          <CardContent className="max-h-[140px] overflow-y-auto px-4 py-2">
            {familyMembersList.map((member) => (
              <CardListItem
                key={member.family_member_id}
                name={member.full_name}
                relationship={member.relationship}
                age={member.age}
                education={member.education_level ?? "No definido"}
                occupation={member.occupation ?? "No definido"}
                income={member.monthly_income ?? 0}
                document_type={member.document_type}
                document_number={member.document_number}
              />
            ))}
          </CardContent>

          <CardFooter className="px-4 py-2">
            <div className="flex flex-col items-start w-full">
              <span className="font-primary text-sm">TOTAL INGRESOS MENSUALES</span>
              <div className="bg-gray-100 w-full h-10 flex items-center justify-start border rounded-lg mt-1 px-3">
                <span className="font-semibold font-primary text-base">
                  {formatCurrency(totalIncome)}
                </span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default FamilyMembers;