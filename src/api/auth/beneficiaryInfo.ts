import { fetcher } from "@/utils/fetcher";

const API_URI = process.env.NEXT_PUBLIC_API_URI;

export async function beneficiaryInfo() {
	const url = `${API_URI}/dev/users/beneficiariesShortInfo`;

	const response = await fetcher(url, {
		method: "GET",
    headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});

	return response;
}
