import envConfig from "@/config/envConfig";
import axiosInstance from "@/lib/AxiosInstance";



export const createProject = async (formData) => {
  try {
    const { data } = await axiosInstance.post("/projects/create-project", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (data.success) {
      return data;
    } else {
      throw new Error(data.message || "Failed to create project...");
    }
  } catch (error) {
    console.error("Error creating project:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Failed to create project",
    );
  }
};

export const updateProject = async (
  id,
  formData,
) => {
  try {
    const { data } = await axiosInstance.patch(
      `/projects/update-project/${id}`,
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
      throw new Error(data.message || "Failed to update project...");
    }
  } catch (error) {
    console.error("Error updating project:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Failed to update project",
    );
  }
};

export const deleteProject = async (projectId) => {
  try {
    const { data } = await axiosInstance.delete(`/projects/delete-project/${projectId}`);

    if (data.success) {
      return data;
    } else {
      throw new Error(data.message || "Failed to delete project");
    }
  } catch (error) {
    console.error("Error deleting project:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Failed to delete project",
    );
  }
};


export const getAllProjects = async (type, category) => {
    let fetchOptions = {
      method: "GET",
      cache: "no-store",
    };
  
    if (type === "isr") {
      fetchOptions = {
        next: {
          tags: ["projects"],
        },
      };
    }
  
    const url = new URL(`${envConfig.baseApi}/projects`);
  
    if (category) {
      url.searchParams.append("category", category);
    }
  
    const res = await fetch(url.toString(), fetchOptions);
  
    if (!res.ok) {
      throw new Error("Failed to fetch projects data");
    }
  
    return res.json();
  };