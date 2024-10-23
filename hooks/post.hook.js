import { createPost, deletePost, getAllPosts, updatePost } from "@/services/PostService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreatePosts = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationKey: ["CREATE_POST"],
      mutationFn: async (postData) => await createPost(postData),
      onSuccess: () => {
        toast.success("Posts created successfully");
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
  
  export const useUpdatePost = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ id, formData }) => updatePost(id, formData),
      onSuccess: (data, variables) => {
        toast.success("Post updated successfully");
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
      onError: (error) => {
        toast.error(error.message || "Failed to update Post");
      },
    });
  };
  
  export const useDeletePost = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async (postId) => {
        const response = await deletePost(postId);
  
        return response;
      },
      onSuccess: () => {
        toast.success("Posts deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
      onError: (error) => {
        toast.error(error.message || "Failed to delete post");
      },
    });
  };

  export const useGetAllPosts = () => {
    return useQuery({
      queryKey: ["posts"],
      queryFn: getAllPosts,
    });
  };