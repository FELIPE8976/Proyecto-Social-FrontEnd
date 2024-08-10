import { useEffect, useState } from "react";
import { fetcher } from "@/utils/fetcher";

const API_URI = process.env.NEXT_PUBLIC_API_URI;

export function DocumentTypes() {
  const [tiposDocumentos, setTiposDocumentos] = useState([]);

  useEffect(() => {
    const obtenerTiposDocumentos = async () => {
      const url = `${API_URI}/dev/users/get-identification-type-list`;

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
          setTiposDocumentos(response);
        } else {
          console.error("Error al obtener los tipos de documentos:", response.status);
        }
      } catch (error) {
        console.error("Error al obtener los tipos de documentos:", error);
      }
    };

    obtenerTiposDocumentos();
  }, []);

  return tiposDocumentos;
}