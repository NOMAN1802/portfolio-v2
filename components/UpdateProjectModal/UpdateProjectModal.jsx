"use client";
import React, { useState, useEffect } from "react";
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
});

import "react-quill/dist/quill.snow.css";

const categoryOptions = ["frontend", "fullstack"];

const UpdateProjectModal = ({ projectData, buttonText, buttonClassName, onUpdate, handleImageChange, imagePreviews, isLoading }) => {
  const [open, setOpen] = useState(false);
  const methods = useForm();

  useEffect(() => {
    if (projectData) {
      methods.reset(projectData); 
    }
  }, [projectData, methods]);

  const handleSubmit = (data) => {
    const sanitizedData = {
      ...data,
      projectDetails: DOMPurify.sanitize(data.projectDetails),
    };
    onUpdate(sanitizedData, methods.reset);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={buttonClassName}>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Project</DialogTitle>
          <DialogDescription>Update the details of your project</DialogDescription>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-4">
            <Input {...methods.register("title", { required: "Title is required" })} placeholder="Enter project title" />

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
              <label>Project Details</label>
              <Controller
                control={methods.control}
                name="projectDetails"
                render={({ field }) => <ReactQuill theme="snow" value={field.value || ""} onChange={field.onChange} />}
              />
            </div>

            <Input {...methods.register("gitLink")} placeholder="Enter GitHub link" />
            <Input {...methods.register("liveLink")} placeholder="Enter live project link" />

            <div>
              <label className="cursor-pointer bg-default-500 text-primary py-2 px-4 rounded-md hover:bg-default-600 transition duration-300">
                <BsUpload className="inline-block mr-2" />
                Choose File
                <input multiple accept="image/*" className="hidden" name="image" type="file" onChange={handleImageChange} />
              </label>
            </div>

            {imagePreviews?.length > 0 && (
              <div className="flex gap-5 my-5 flex-wrap">
                {imagePreviews?.map((imageDataUrl, index) => (
                  <div key={index} className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2">
                    <img alt="item" className="h-full w-full object-cover object-center rounded-md" src={imageDataUrl} />
                  </div>
                ))}
              </div>
            )}

            <DialogFooter>
              <Button variant="ghost" type="button" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating Project..." : "Update Project"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProjectModal;
