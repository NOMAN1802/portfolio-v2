"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaGithub, FaLink } from 'react-icons/fa';
import DOMPurify from 'dompurify';
import { useUser } from '@/context/user.provider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import Link from 'next/link';
import AnimatedText from '../AnimatedText ';

const ProjectDetails = ({ project: initialProject }) => {
  const [project, setProject] = useState(initialProject);
  const { user } = useUser();
  const [selectedImage, setSelectedImage] = useState(project.images[0]);

  const sanitizedProjectDetails = DOMPurify.sanitize(project.projectDetails);

  useEffect(() => {
    setProject(initialProject);
  }, [initialProject]);

  return (
    <>
      
      <div className="container mx-auto py-10 px-4 lg:px-6">
      <AnimatedText text={`Learn more about ${project.title}`} textStyles="h2 font-primary my-8" />
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 mb-6 lg:mb-0 space-y-4">
            {/* Main Image */}
            <div className="mb-4 lg:mb-6">
              <Image
                src={selectedImage}
                alt={project.title}
                width={600}
                height={500}
                className="rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex space-x-2 overflow-auto">
              {project.images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(image)}
                  className={`border rounded-md transition-all duration-200 ${
                    selectedImage === image ? 'border-blue-500 shadow-md' : 'border-gray-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${idx + 1}`}
                    width={100}
                    height={120}
                    className="rounded-md"
                  />
                </button>
              ))}
            </div>

            {/* Git and Live Links */}
           {/* Git and Live Links */}
      <div className="flex justify-between items-center mt-6 space-x-4">
  {project.gitLink && (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={project.gitLink} target="_blank" className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-300 to-gray-400 text-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <FaGithub className="text-xl" />
            <span className="text-sm font-semibold">GitHub</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>View Repository</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )}

  {project.liveLink && (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={project.liveLink} target="_blank" className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <FaLink className="text-xl" />
            <span className="text-sm font-semibold">Live Demo</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>View Live Demo</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )}
</div>

          </div>

          {/* Project Details and Author Info */}
          <div className="w-full lg:w-1/2 lg:pl-8 space-y-6">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2 text-gray-800 font-primary">{project?.title}</h1>
            <h2 className="text-xl lg:text-2xl font-semibold mb-4 text-gray-600">{project?.category}</h2>
            <p className="text-lg text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: sanitizedProjectDetails }}></p>

            {/* Author Info */}
            <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-md">
              <Image
                src="/assets/hero/dev.png"
                alt={user?.name}
                width={60}
                height={60}
                className="rounded-full shadow-lg"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-800">Author: Mustakim Al Noman</span>
                <span className="text-sm font-semibold text-gray-600">Email: mustakimalnoman@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
