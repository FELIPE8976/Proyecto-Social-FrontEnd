type identification_type_id = {
	identification_type_id: string;
	description: string;
};

export type CreateBeneficiaryFirstForm = {
	names: string;
	blood_type: string;
	identification_type_id: identification_type_id;
	first_last_name: string;
	second_last_name: string;
	personal_id: string;
	birthdate: string;
	health_entity: string;
	institution_name: string;
};

type socioeconomic_status_id = {
	socioeconomic_status_id: string;
	socioeconomic_status_value: number;
};


export type CreateBeneficiarySecondForm = {
	interviewed_person_names: string;
	interviewed_person_first_last_name: string;
	interviewed_person_second_last_name: string;
	interviewed_person_id: string;
	relationship: string;
	interviewed_person_id_type: string;
	address: string;
	district: string;
	socioeconomic_status_id: socioeconomic_status_id;
	country: string;
	department: string;
	city: string;
	community: string;
	first_phone_number: string;
	second_phone_number: string;
	third_phone_number: string;
};

type housing_type = {
	housing_type: string;
	description: string;
	rental_value_month: number;
	loan_value_month: number;
	bank: string;
};

export type CreateBeneficiaryThirdForm = {
	housing_type: housing_type;
};

export type CreateBeneficiaryFourthForm = {
	referred_by: string;
	referral_address: string;
	referral_phones: string;
	entity_organization: string;
};

export type family_member = {
	user_id: string;
	full_name: string;
	age: number;
	relationship: string;
	occupation: string;
	education_level: string;
	monthly_income: number;
	document_type: string;
	document_number: string;
};

export type CreateBeneficiaryFifthForm = {
	family_members: family_member[];
	total_monthly_income: number;
};

export type CreateBeneficiarySixthForm = {
	referral_cause: string;
	support_request: string;
	observations: string;
};

export type CreateBeneficiaryForm = CreateBeneficiaryFirstForm &
	CreateBeneficiarySecondForm &
	CreateBeneficiaryThirdForm &
	CreateBeneficiaryFourthForm &
	CreateBeneficiaryFifthForm &
	CreateBeneficiarySixthForm;
