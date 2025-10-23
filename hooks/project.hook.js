import { createProject, deleteProject, getAllProjects, updateProject } from "@/services/ProjectService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateProjects = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationKey: ["CREATE_PROJECT"],
      mutationFn: async (projectData) => await createProject(projectData),
      onSuccess: () => {
        toast.success("Projects created successfully");
        queryClient.invalidateQueries({ queryKey: ["projects"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
  
  export const useUpdateProject = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ id, formData }) => updateProject(id, formData),
      onSuccess: (data, variables) => {
        toast.success("Project updated successfully");
        queryClient.invalidateQueries({ queryKey: ["projects"] });
      },
      onError: (error) => {
        toast.error(error.message || "Failed to update Project");
      },
    });
  };
  
  export const useDeleteProject = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async (projectId) => {
        const response = await deleteProject(projectId);
  
        return response;
      },
      onSuccess: () => {
        toast.success("Projects deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["projects"] });
      },
      onError: (error) => {
        toast.error(error.message || "Failed to delete project");
      },
    });
  };

  export const useGetAllProjects = () => {
    return useQuery({
      queryKey: ["projects"],
      queryFn: getAllProjects,
    });
  };