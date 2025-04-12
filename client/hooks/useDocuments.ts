import {
 getDocuments, 
 getDocument, 
 createDocument,
 updateDocument,
 deleteDocument   
} from "../api/document.api"
import { useMutation, useQuery } from "@tanstack/react-query";

export const useDocuments=()=>{

    const {
        data : documents,
        isLoading,
        error
    } = useQuery({
queryKey: ["documents"],
queryFn : getDocuments
    })
    
    const createDocumentMutation = useMutation({
        mutationFn: createDocument,
        // This ensures the mutation returns the created document
        onSuccess: (data) => {
            return data; // Return the created document
        },
    });
    const updateDocumentMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => updateDocument(id, data),

    });
    const deleteDocumentMutation = useMutation({
        mutationFn: (id: string) => deleteDocument(id),

    });
    

    
    return{
        documents,
        isLoading,
        error,
        createDocument:createDocumentMutation.mutate,
        createDocumentResult: createDocumentMutation.data,
        updateDocument:updateDocumentMutation.mutate,
        deleteDocument:deleteDocumentMutation.mutate
    }
}

export const useDocument = (id: string) => {
    return useQuery({
        queryKey: ["doc", id],
        queryFn: () => getDocument(id),
      });


  };