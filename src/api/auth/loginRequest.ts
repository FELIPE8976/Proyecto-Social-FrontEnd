import { useAuth } from "@/contexts/AuthProvider";
import { fetcher } from "@/utils/fetcher";

const API_URI = process.env.NEXT_PUBLIC_API_URI;

export type Props = {
	identifier: string;
	password: string;
};

export async function loginRequest({ identifier, password }: Props) {
	const token = localStorage.getItem("token");
	const url = `${API_URI}/dev/login`;

	const response = await fetcher(url, {
		method: "POST",
		body: JSON.stringify({ personal_id: identifier, password: password }),
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	return response;
}
