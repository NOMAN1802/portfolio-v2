import envConfig from "@/config/envConfig";
import axiosInstance from "@/lib/AxiosInstance";

export const createPost = async (formData) => {
  try {
    const { data } = await axiosInstance.post("/posts/create-post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (data.success) {
      return data;
    } else {
      throw new Error(data.message || "Failed to create posts...");
    }
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Failed to create post",
    );
  }
};

export const updatePost = async (
  id,
  formData,
) => {
  try {
    const { data } = await axiosInstance.patch(
      `/posts/update-post/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    if (data.success) {
      return data;
    } else {
      throw new Error(data.message || "Failed to update post...");
    }
  } catch (error) {
    console.error("Error updating post:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Failed to update post",
    );
  }
};

export const deletePost = async (postId) => {
  try {
    const { data } = await axiosInstance.delete(`/posts/delete-post/${postId}`);

    if (data.success) {
      return data;
    } else {
      throw new Error(data.message || "Failed to delete post");
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Failed to delete post",
    );
  }
};


export const getAllPosts = async (type, category) => {
    let fetchOptions = {
      method: "GET",
      cache: "no-store",
    };
  
    if (type === "isr") {
      fetchOptions = {
        next: {
          tags: ["posts"],
        },
      };
    }
  
    const url = new URL(`${envConfig.baseApi}/posts`);
  
    if (category) {
      url.searchParams.append("category", category);
    }
  
    const res = await fetch(url.toString(), fetchOptions);
  
    if (!res.ok) {
      throw new Error("Failed to fetch posts data");
    }
  
    return res.json();
  };

  export const getPost = async (id) => {
    const res = await fetch(`${envConfig.baseApi}/posts/${id}`, {
      cache: "no-store",
    });
  
    return res.json();
  };