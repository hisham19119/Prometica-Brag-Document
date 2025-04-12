const API_URL = "http://localhost:4000/api/documents";

// Get all achievements for a document
// export const getAchievements = async (documentId: string) => {
//   try{
//     const res = await fetch(`${API_URL}/${documentId}/achievements`, {
//       credentials: "include",
//     });
//     if (!res.ok) throw new Error("Failed to fetch achievements");
//     return res.json();
//   }catch(err){
//     console.error("getAchievements error:", err);
//     throw err;
//   }


// };

// Get a single achievement by ID
// export const getAchievement = async (
//   documentId: string,
//   achievementId: string
// ) => {
//   const res = await fetch(`${API_URL}/${documentId}/achievements/${achievementId}`, {
//     credentials: "include",
//   });
//   if (!res.ok) throw new Error("Failed to fetch achievement");
//   return res.json();
// };

// Create a new achievement
export const createAchievement = async (
  documentId: string,
  achievement: { title: string; accomplishment: string; category: string; date: string; description: string; impact: string }
) => {
  const res = await fetch(`${API_URL}/${documentId}/achievements`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(achievement),
  });
  if (!res.ok) throw new Error("Failed to create achievement");
  return res.json();
};

// Update an existing achievement
export const updateAchievement = async (
  documentId: string,
  achievementId: string,
  updatedFields: { title?: string; accomplishment?: string; category?: string; date?: string; description?: string; impact?: string }
) => {
  const res = await fetch(`${API_URL}/${documentId}/achievements/${achievementId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(updatedFields),
  });
  if (!res.ok) throw new Error("Failed to update achievement");
  return res.json();
};

// Delete an achievement
export const deleteAchievement = async (
  documentId: string,
  achievementId: string
) => {
  const res = await fetch(`${API_URL}/${documentId}/achievements/${achievementId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to delete achievement");
  return res.json();
};
