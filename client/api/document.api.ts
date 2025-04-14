const API_URL = "https://prometica-srv.vercel.app/api/documents";


export const getDocuments = async () => {
    const res = await fetch(API_URL, {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch documents");
    return res.json();
  };
  
  export const getDocument = async (id: string) => {
    const res = await fetch(`${API_URL}/${id}`, {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch document");
    return res.json();
  };
  
  // export const createDocument = async (doc: { title: string; achievements: any[] }) => {
  //   const res = await fetch(API_URL, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     credentials: "include",
  //     body: JSON.stringify(doc),
  //   });
  //   if (!res.ok) throw new Error("Failed to create document");
  //   return res.json();
  // };
  
  export const createDocument = async (doc: { title: string; achievements: any[] }): Promise<{ _id: string; title: string; achievements: any[] }> => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(doc),
    });
    if (!res.ok) throw new Error("Failed to create document");
    return res.json(); // Ensure this returns an object with id and title
};


  export const updateDocument = async (
    id: string,
    updatedFields: { title?: string }
  ) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(updatedFields),
    });
    if (!res.ok) throw new Error("Failed to update document");
    return res.json();
  };
  
  export const deleteDocument = async (id: string) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to delete document");
    return res.json();
  };
  