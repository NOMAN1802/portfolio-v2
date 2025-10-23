"use client";


import React, { useEffect } from "react";
import { BsUpload } from "react-icons/bs";
import dynamic from "next/dynamic";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import DOMPurify from "dompurify";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

import "react-quill/dist/quill.snow.css";
import { FaTimes } from "react-icons/fa";

const categoryOptions = ["Frontend", "Database", "Backend"];

const UpdatePostModal = ({ isOpen, onClose, postData, onSubmit, handleImageChange, imagePreviews, isLoading, removeImage }) => {
  const methods = useForm();

  useEffect(() => {
    if (postData) {
      methods.reset(postData); 
    }
  }, [postData, methods]);

  const handleSubmit = (data) => {
    const sanitizedData = {
      ...data,
      postDetails: DOMPurify.sanitize(data.postDetails),
    };
    onSubmit(sanitizedData, methods.reset);
    onClose(); 
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Post</DialogTitle>
          <DialogDescription>Update the details of your post</DialogDescription>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-4">
            <Input {...methods.register("title", { required: "Title is required" })} placeholder="Enter post title" />

            <div>
              <label>Category</label>
              <Controller
                control={methods.control}
                name="category"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                rules={{ required: "Category is required" }}
              />
              {methods.formState.errors.category && <p className="text-red-500">{methods.formState.errors.category.message}</p>}
            </div>

            <div>
              <label>Post Details</label>
              <Controller
                control={methods.control}
                name="postDetails"
                render={({ field }) => <ReactQuill theme="snow" value={field.value || ""} onChange={field.onChange} />}
              />
            </div>

            
            <Input {...methods.register("resourceLink")} placeholder="Enter Resource Link" />

            <div>
              <label className="cursor-pointer bg-accent/20 text-primary py-2 px-4 rounded-md hover:bg-default-600 transition duration-300">
                <BsUpload className="inline-block mr-2" />
                Choose File
                <input
                  multiple
                  accept="image/*"
                  className="hidden"
                  name="image"
                  type="file"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            {imagePreviews.length > 0 && (
              <div className="flex gap-5 my-5 flex-wrap">
                {imagePreviews.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2"
                  >
                    <img
                      alt="item"
                      className="h-full w-full object-cover object-center rounded-md"
                      src={imageUrl}
                    />
                    <button
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-300"
                      type="button"
                      onClick={() => removeImage(index)}
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <DialogFooter>
              <Button variant="ghost" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating Post..." : "Update Post"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePostModal;
