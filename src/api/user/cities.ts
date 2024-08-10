import { useEffect, useState } from "react";
import { fetcher } from "@/utils/fetcher";

const API_URI = process.env.NEXT_PUBLIC_API_URI;

export function Cities(department : string,) {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (!department) {
      setCities([]); // Vaciar ciudades si no hay departamento
      return;
    }
    const getCities = async () => {
      const url = `${API_URI}/dev/users/get-cities-by-department-list/${department}`;

      try {
        	const response = await fetcher(url, {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
        if (response) {
          setCities(response);
        } else {
          console.error("Error al obtener los cities:", response.status);
          setCities([]);
        }
      } catch (error) {
        console.error("Error al obtener los cities:", error);
        setCities([]);
      }
    };

    getCities();
  }, [department]);

  return cities;
}