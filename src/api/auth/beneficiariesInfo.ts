import { fetcher } from "@/utils/fetcher";




const API_URI = process.env.NEXT_PUBLIC_API_URI;
export async function beneficiariesInfo() {
	const url = `${API_URI}/dev/users/beneficiaries-short-info`;
	var response
	try{
			response = await fetcher(url, {
			method: "GET",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		if (response) {
          return response;
        } else {
          console.error("Error al obtener los beneficiarios:", response.status);
        }
	}catch(error){
		console.error("Error al obtener los beneficiarios:", error);
	}
}
