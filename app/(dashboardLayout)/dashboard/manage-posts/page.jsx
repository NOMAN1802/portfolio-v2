"use client";
import React, { useState } from 'react';
import { useUser } from '@/context/user.provider';
import { toast } from 'sonner';
import { useCreatePosts } from '@/hooks/post.hook';
import AddPostModal from '@/components/AddPostModal/AddPostModal';
import MyPosts from '@/components/MyPosts/MyPosts';

const MyPostsPage = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const { user } = useUser();
  const { mutate: createProject, isPending } = useCreatePosts(); 

  const onSubmitForm = (data, resetForm) => {
    if (!user) {
      toast.error("You must be logged in to create a post");
      return;
    }
  
    const formData = new FormData();
    const postData = { ...data };
    formData.append("data", JSON.stringify(postData));
  
    for (let image of imageFiles) {
      formData.append("postImages", image);
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
          <AddPostModal
            buttonText="Create New Post"
            title="Create New Post"
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
        <h2 className="text-2xl font-bold mb-4">My Posts</h2>
        <MyPosts /> 
      </div>
    </div>
  );
};

export default MyPostsPage;
