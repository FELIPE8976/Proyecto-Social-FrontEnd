import { useEffect, useState } from "react";
import { fetcher } from "@/utils/fetcher";

const API_URI = process.env.NEXT_PUBLIC_API_URI;

export function Departments() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const getDepartments = async () => {
      const url = `${API_URI}/dev/users/get-departments-list`;

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
          console.log(response);
          setDepartments(response);
        } else {
          console.error("Error al obtener los Departments:", response.status);
        }
      } catch (error) {
        console.error("Error al obtener los Departments:", error);
      }
    };

    getDepartments();
  }, []);

  return departments;
}