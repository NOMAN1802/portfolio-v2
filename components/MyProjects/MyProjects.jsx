"use client";
import React, { useState } from 'react';
import { useUpdateProject, useDeleteProject, useGetAllProjects } from '@/hooks/project.hook';
import { useUser } from '@/context/user.provider';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { FaEdit, FaTrash, FaGithub, FaLink } from 'react-icons/fa';
import Link from 'next/link';
import UpdateProjectModal from '../UpdateProjectModal/UpdateProjectModal';
import DeleteProjectModal from '../DeleteProjectModal/DeleteProjectModal';

const MyProjects = () => {
  const { user } = useUser();
  const { data: myProjects, isLoading } = useGetAllProjects();
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const projects = myProjects?.data?.projects;
  console.log(projects)

  const handleUpdate = (project) => {
    setSelectedProject(project);
    setIsUpdateModalOpen(true);
    setImagePreview(project.image);
  };

  const handleUpdateSubmit = (data, resetForm) => {
    if (!selectedProject || !user) return;

    const formData = new FormData();
    const projectData = {
      ...data,
     
    };
    formData.append("data", JSON.stringify(projectData));

    if (imageFile) {
      formData.append("projectImage", imageFile);
    }

    updateProject(
      { id: selectedProject._id, formData },
      {
        onSuccess: () => {
          resetForm();
          setSelectedProject(null);
          setIsUpdateModalOpen(false);
          setImageFile(null);
          setImagePreview(null);
        },
      }
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (project) => {
    setSelectedProject(project);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedProject) {
      deleteProject(selectedProject._id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelectedProject(null);
        },
      });
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-48">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
    </div>;
  }

  if (!projects?.length) {
    return <p className="text-center py-4">You haven't created any projects yet.</p>;
  }

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden md:table-cell w-[100px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead className="hidden lg:table-cell">Links</TableHead>
              <TableHead className="hidden xl:table-cell">Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects?.map((project) => (
              <TableRow key={project._id}>
                <TableCell className="hidden md:table-cell">
                  <Avatar>
                    <img 
                      src={project?.images[0] || '/placeholder-project.jpg'} 
                      alt={project?.title}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </Avatar>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{project?.title}</span>
                    <span className="text-sm text-muted-foreground md:hidden">
                      {project?.category}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="secondary">
                    {project?.category}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="flex space-x-2">
                    {project?.gitLink && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link href={project?.gitLink} target="_blank">
                              <FaGithub className="text-lg hover:text-primary" />
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View Repository</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                    {project?.liveLink && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link href={project?.liveLink} target="_blank">
                              <FaLink className="text-lg hover:text-primary" />
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View Live Demo</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </TableCell>
                <TableCell className="hidden xl:table-cell">
                  {new Date(project?.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleUpdate(project)}
                          >
                            <FaEdit className="text-gray-600 hover:text-primary" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit Project</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDelete(project)}
                          >
                            <FaTrash className="text-red-500 hover:text-red-600" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete Project</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedProject && (
        <>
          <UpdateProjectModal
            isOpen={isUpdateModalOpen}
            onClose={() => setIsUpdateModalOpen(false)}
            project={selectedProject}
            onSubmit={handleUpdateSubmit}
            isLoading={isUpdating}
            handleImageChange={handleImageChange}
            imagePreview={imagePreview}
          />
          <DeleteProjectModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            project={selectedProject}
            onConfirm={confirmDelete}
            isLoading={isDeleting}
          />
        </>
      )}
    </div>
  );
};

export default MyProjects;