import React, { useState } from 'react';
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
import { useUser } from '@/context/user.provider';
import { useDeleteProject, useGetAllProjects, useUpdateProject } from '@/hooks/project.hook';

const MyProjects = () => {
  const { user } = useUser();
  const { data: myProjects, isLoading } = useGetAllProjects();
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const projects = myProjects?.data?.projects;

  const handleUpdate = (project) => {
    setSelectedProject(project);
    setIsUpdateModalOpen(true);
    setImagePreviews(project.images || []); 
    setImageFiles([]); 
  };

  const handleUpdateSubmit = (data, resetForm) => {
    if (!selectedProject || !user) return;

    const formData = new FormData();
    const projectData = {
      ...data,
    };
    formData.append("data", JSON.stringify(projectData));

    for (let image of imageFiles) {
      formData.append("projectImages", image);
    }

    updateProject(
      { id: selectedProject._id, formData },
      {
        onSuccess: () => {
          resetForm();
          setSelectedProject(null);
          setIsUpdateModalOpen(false);
          setImageFiles([]);
          setImagePreviews([]);
        },
      }
    );
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      const newImageFiles = Array.from(files);
      setImageFiles((prev) => [...prev, ...newImageFiles]);

      newImageFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews((prev) => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
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
            projectData={selectedProject} 
            onSubmit={handleUpdateSubmit} 
            isLoading={isUpdating}
            handleImageChange={handleImageChange}
            imagePreviews={imagePreviews} 
            removeImage={removeImage} 
          />
          <DeleteProjectModal
         isOpen={isDeleteModalOpen} 
         onClose={() => setIsDeleteModalOpen(false)} 
         projectName={selectedProject?.title} 
         onSubmit={confirmDelete} 
         isLoading={isDeleting} 
       />
        </>
      )}
    </div>
  );
};

export default MyProjects;