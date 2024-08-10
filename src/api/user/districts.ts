import { useEffect, useState } from "react";
import { fetcher } from "@/utils/fetcher";

const API_URI = process.env.NEXT_PUBLIC_API_URI;

export function Districts() {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const getDistricts = async () => {
      const url = `${API_URI}/dev/users/get-district-list`;

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
          setDistricts(response);
        } else {
          console.error("Error al obtener los Districts:", response.status);
        }
      } catch (error) {
        console.error("Error al obtener los Districts:", error);
      }
    };

    getDistricts();
  }, []);

  return districts;
}