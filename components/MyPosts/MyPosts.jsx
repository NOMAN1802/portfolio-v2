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
import UpdatePosttModal from '../UpdatePostModal/UpdatePostModal';
import DeletePostModal from '../DeletePostModal/DeletePostModal';
import { useUser } from '@/context/user.provider';
import { useDeletePost, useGetAllPosts, useUpdatePost } from '@/hooks/post.hook';
import UpdatePostModal from '../UpdatePostModal/UpdatePostModal';



const MyPosts = () => {
  const { user } = useUser();
  const { data: myPosts, isLoading } = useGetAllPosts();
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost();
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();
  const [selectedPost, setSelectedPost] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const posts = myPosts?.data?.posts;

  const handleUpdate = (post) => {
    setSelectedPost(post);
    setIsUpdateModalOpen(true);
    setImagePreviews(post.images || []); 
    setImageFiles([]); 
  };

  const handleUpdateSubmit = (data, resetForm) => {
    if (!selectedPost || !user) return;

    const formData = new FormData();
    const postData = {
      ...data,
    };
    formData.append("data", JSON.stringify(postData));

    for (let image of imageFiles) {
      formData.append("postImages", image);
    }

    updatePost(
      { id: selectedPost._id, formData },
      {
        onSuccess: () => {
          resetForm();
          setSelectedPost(null);
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

  const handleDelete = (post) => {
    setSelectedPost(post);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedPost) {
      deletePost(selectedPost._id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelectedPost(null);
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
            {posts?.map((post) => (
              <TableRow key={post._id}>
                <TableCell className="hidden md:table-cell">
                  <Avatar>
                    <img 
                      src={post?.images[0] || '/placeholder-post.jpg'} 
                      alt={post?.title}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </Avatar>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{post?.title}</span>
                    <span className="text-sm text-muted-foreground md:hidden">
                      {post?.category}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="secondary">
                    {post?.category}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="flex space-x-2">
                    
                    {post?.liveLink && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link href={post?.liveLink} target="_blank">
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
                  {new Date(post?.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleUpdate(post)}
                          >
                            <FaEdit className="text-gray-600 hover:text-primary" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit Post</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDelete(post)}
                          >
                            <FaTrash className="text-red-500 hover:text-red-600" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete Post</p>
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

      {selectedPost && (
        <>
          <UpdatePostModal
            isOpen={isUpdateModalOpen} 
            onClose={() => setIsUpdateModalOpen(false)}
            postData={selectedPost} 
            onSubmit={handleUpdateSubmit} 
            isLoading={isUpdating}
            handleImageChange={handleImageChange}
            imagePreviews={imagePreviews} 
            removeImage={removeImage} 
          />
          <DeletePostModal
         isOpen={isDeleteModalOpen} 
         onClose={() => setIsDeleteModalOpen(false)} 
         postName={selectedPost?.title} 
         onSubmit={confirmDelete} 
         isLoading={isDeleting} 
       />
        </>
      )}
    </div>
  );
};

export default MyPosts;