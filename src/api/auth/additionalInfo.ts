import { fetcher } from "@/utils/fetcher";

export type Props = {
	personal_id: string;
};

const API_URI = process.env.NEXT_PUBLIC_API_URI;
export async function additionalInfo(personal_id: string) {
	const url = `${API_URI}/dev/users/additional-info/${personal_id}`;
	const response = await fetcher(url, {
		method: "GET",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	return response;
}
