import type { Student } from "./models/Student";

const URL = "http://127.0.0.1:8000/api"

export async function fetchUsers(): Promise<Student[]> {
    const response = await fetch(`${URL}/students`);
  
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed: ${text}`);
    }
  
    const data: Student[] = await response.json();
    return data;
  }

  export async function addeditUsers(data: {id?: string, first_name?:string, middle_name?: string, last_name?: string, course?: any, subjects?: any}, methodType: string) {
    const url =
      methodType === "PATCH"
        ? `${URL}/student/${data.id}/`
        : `${URL}/students/`;
  
    const cleanData = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== undefined && v !== "")
      );
    if (methodType === "POST") delete cleanData.id;
  
    const response = await fetch(url, {
      method: methodType,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cleanData)
    });
  
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Request failed: ${response.status}\n${text}`);
    }
  
    return await response.json();
  }

export async function deleteUser(id:string) {
    const result = fetch(`${URL}/student/${id}/`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })

    return (await result).json()
}

export const fetchSubjects = async () => {
    const response = await fetch(`${URL}/subjects/`);
    if (!response.ok) throw new Error('Failed to fetch subjects');
    return response.json();
}