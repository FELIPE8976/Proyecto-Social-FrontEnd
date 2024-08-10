import { fetcher } from "@/utils/fetcher";

const API_URI = process.env.NEXT_PUBLIC_API_URI;

type Props = {
	personal_id: string;
	image: string;
	file: string;
};

export async function loginRequest({ personal_id, image, file }: Props) {
	const token = localStorage.getItem("token");
	const url = `${API_URI}/dev/users/upload-image`;

	const response = await fetcher(url, {
		method: "POST",
		body: JSON.stringify({ personal_id, image, file }),
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	return response;
}
