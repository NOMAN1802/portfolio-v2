"use client";
import React, { useState } from "react";
import { BsUpload } from "react-icons/bs";
import dynamic from "next/dynamic";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
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
  loading: () => (
    <div className="h-screen bg-black/10 fixed inset-0 z-[999] backdrop-blur-md flex justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-500" />
    </div>
  ),
});

import "react-quill/dist/quill.snow.css";

const categoryOptions = ["Frontend", "Database", "Backend"];

const AddPostModal = ({
  buttonText,
  title,
  buttonClassName,
  onSubmit,
  handleImageChange,
  imagePreviews,
  isLoading,
}) => {

  const [open, setOpen] = useState(false);
  const methods = useForm();

  const handleSubmit = (data) => {
    const sanitizedData = {
      ...data,
      postDetails: DOMPurify.sanitize(data.postDetails),
    };
    onSubmit(sanitizedData, methods.reset);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={buttonClassName}>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Create a new post</DialogDescription>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-4">
            {/* Title Input */}
            <Input
              {...methods.register("title", { required: "Title is required" })}
              label="Title"
              placeholder="Enter post title"
            />

            {/* Category Selection using Controller */}
            <div>
              <label>Category</label>
              <Controller
                control={methods.control}
                name="category"
                defaultValue="" 
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
              {methods.formState.errors.category && (
                <p className="text-red-500">{methods.formState.errors.category.message}</p>
              )}
            </div>

            {/* Post Details (using ReactQuill) */}
            <div>
              <label>Post Details</label>
              <Controller
                control={methods.control}
                name="postDetails"
                defaultValue="" 
                render={({ field }) => (
                  <ReactQuill
                    theme="snow"
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

         

            {/* Resource Link */}
            <Input
              {...methods.register("resourceLink")}
              label="Live Resource Link"
              placeholder="Enter Resource Link"
            />

            {/* Image Upload */}
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
            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="flex gap-5 my-5 flex-wrap">
                {imagePreviews.map((imageDataUrl, index) => (
                  <div
                    key={index}
                    className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2"
                  >
                    <img
                      alt="item"
                      className="h-full w-full object-cover object-center rounded-md"
                      src={imageDataUrl}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Dialog Footer */}
            <DialogFooter>
              <Button variant="ghost" type="button">
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating Post..." : "Create Post"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default AddPostModal;
