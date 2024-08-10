import { useEffect, useState } from "react";
import { fetcher } from "@/utils/fetcher";

const API_URI = process.env.NEXT_PUBLIC_API_URI;

export function SocioeconimicStatus() {
  const [socioeconimicStatus, setSocioeconimicStatus] = useState([]);

  useEffect(() => {
    const getSocioeconimicStatus = async () => {
      const url = `${API_URI}/dev/users/get-socioeconomic-status-list `;

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
          setSocioeconimicStatus(response);
        } else {
          console.error("Error al obtener los SocioeconimicStatus:", response.status);
        }
      } catch (error) {
        console.error("Error al obtener los SocioeconimicStatus:", error);
      }
    };

    getSocioeconimicStatus();
  }, []);

  return socioeconimicStatus;
}