import { fetcher } from "@/utils/fetcher";

const API_URI = process.env.NEXT_PUBLIC_API_URI;

export type Props = {
	identifier: string;
};

export async function userLogin(identifier: string) {
	const url = `${API_URI}/dev/login/name/${identifier}`;

	const response = await fetcher(url, {
		method: "GET",
	});

	return response;
}
