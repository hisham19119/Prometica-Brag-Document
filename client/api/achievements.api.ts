const API_URL = "https://prometica-server.vercel.app/api/documents";

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
