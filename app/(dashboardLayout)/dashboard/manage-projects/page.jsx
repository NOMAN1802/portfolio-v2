"use client";
import React, { useState } from 'react';
import AddProjectModal from "@/components/AddProjectModal/AddProjectModal";
import { useUser } from '@/context/user.provider';
import { toast } from 'sonner';
import MyProjects from '@/components/MyProjects/MyProjects';
import { useCreateProjects } from '@/hooks/project.hook';

const MyProjectsPage = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const { user } = useUser();
  const { mutate: createProject, isPending } = useCreateProjects(); 

  const onSubmitForm = (data, resetForm) => {
    if (!user) {
      toast.error("You must be logged in to create a project");
      return;
    }
  
    const formData = new FormData();
    const projectData = { ...data };
    formData.append("data", JSON.stringify(projectData));
  
    for (let image of imageFiles) {
      formData.append("projectImages", image);
    }
   
  
    createProject(formData, {
      onSuccess: () => {
        resetForm();
        setImageFiles([]);
        setImagePreviews([]);
      },
    });
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFiles((prev) => [...prev, file]);
  
    if (file) {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result]);
      };
  
      reader.readAsDataURL(file);
    }
  };

  

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        
        <div className="mt-6">
          <AddProjectModal
            buttonText="Create New Project"
            title="Create New Project"
            buttonVariant="solid"
            buttonClassName="bg-gradient-to-r from-default-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
            onSubmit={onSubmitForm}
            handleImageChange={handleImageChange}
            imagePreviews={imagePreviews}
            isLoading={isPending}
          />
        </div>
      </div>
      <div className="bg-gray-100 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">My Projects</h2>
        <MyProjects /> 
      </div>
    </div>
  );
};

export default MyProjectsPage;
