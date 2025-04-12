import { useQuery, useMutation } from "@tanstack/react-query";
import {

  createAchievement,
  updateAchievement,
  deleteAchievement,
} from "../api/achievements.api";

// Custom hook to manage achievements for a specific document
export const useAchievements = (documentId: string) => {
  // Query to get all achievements for a document
  // const { data: achievements, isLoading, error } = useQuery({
  //   queryKey: ["achievements", documentId],
  //   queryFn: () => getAchievements(documentId),
  // });

  // Mutation for creating a new achievement
  const createAchievementMutation = useMutation({
    mutationFn: (newAchievement: any) => createAchievement(documentId, newAchievement),
  });

  // Mutation for updating an achievement
  const updateAchievementMutation = useMutation({
    mutationFn: (updatedData: { achievementId: string, updatedFields: any }) =>
      updateAchievement(documentId, updatedData.achievementId, updatedData.updatedFields),
  });

  // Mutation for deleting an achievement
  const deleteAchievementMutation = useMutation({
    mutationFn: (achievementId: string) => deleteAchievement(documentId, achievementId),
  });

  return {
    // achievements,
    // isLoading,
    // error,
    createAchievement: createAchievementMutation.mutate,
    updateAchievement: updateAchievementMutation.mutate,
    deleteAchievement: deleteAchievementMutation.mutate,
  };
};


// export const useAchievement = (docId: string , achId : string) => {
//     return useQuery({
//         queryKey: ["Ach", achId],
//         queryFn: () => getAchievement(docId , achId),
//       });

//   };