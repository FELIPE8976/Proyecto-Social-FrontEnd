const API_URI = process.env.NEXT_PUBLIC_API_URI;

export async function createBeneficiary(form: any) {
	const token = localStorage.getItem("token");
	const url = `${API_URI}/dev/users/create-beneficiary`;

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(form),
	});

	const data = await response.text();

	return response;
}
