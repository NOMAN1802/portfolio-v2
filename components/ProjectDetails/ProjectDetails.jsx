"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaGithub, FaLink, FaCalendarAlt, FaTag, FaUser, FaEnvelope, FaEye, FaCopy, FaCheck, FaTimes, FaArrowLeft, FaHome } from 'react-icons/fa';
import DOMPurify from 'dompurify';
import { useUser } from '@/context/user.provider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import Link from 'next/link';
import AnimatedText from '../AnimatedText ';

const ProjectDetails = ({ project: initialProject }) => {
  const [project, setProject] = useState(initialProject);
  const { user } = useUser();
  const [selectedImage, setSelectedImage] = useState(project.images[0]);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [linkCopied, setLinkCopied] = useState(false);

  const sanitizedProjectDetails = DOMPurify.sanitize(project.projectDetails);

  useEffect(() => {
    setProject(initialProject);
  }, [initialProject]);

  const copyLinkToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link: ', err);
    }
  };

  const openImagePreview = () => {
    setCurrentImageIndex(0);
    setShowImagePreview(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const closeImagePreview = () => {
    setShowImagePreview(false);
  };

  return (
    <>
      {/* Full Width Hero Banner with Background Image */}
      <div className="relative w-full h-[70vh] lg:h-[80vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={selectedImage}
            alt={project.title}
            fill
            className="object-cover w-full h-full"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        </div>

        {/* Back to Home Button - Top Left */}
        <div className="absolute top-6 left-6 z-20">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link 
                  href="/"
                  className="group inline-flex items-center space-x-3 px-4 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:border-white/50 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 font-medium"
                >
                  <FaArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform duration-300" />
                  <FaHome className="text-lg group-hover:scale-110 transition-transform duration-300" />
                  <span className="hidden sm:inline">Back to Home</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Return to homepage</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Top Right Action Icons */}
        <div className="absolute top-6 right-6 z-20 flex space-x-3">
          {/* Image Preview Icon */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={openImagePreview}
                  className="group p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:border-white/50 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110"
                >
                  <FaEye className="text-lg group-hover:scale-110 transition-transform duration-300" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Preview Images</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Copy Link Icon */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={copyLinkToClipboard}
                  className="group p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:border-white/50 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110"
                >
                  {linkCopied ? (
                    <FaCheck className="text-lg text-green-400 group-hover:scale-110 transition-transform duration-300" />
                  ) : (
                    <FaCopy className="text-lg group-hover:scale-110 transition-transform duration-300" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{linkCopied ? 'Link copied!' : 'Copy Link'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4 lg:px-6">
          <div className="text-center text-white max-w-5xl">
            {/* Category Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <FaTag className="text-blue-400" />
              <span className="text-sm font-semibold uppercase tracking-wider">{project?.category}</span>
            </div>

            {/* Project Title */}
            <AnimatedText 
              text={project.title} 
              textStyles="text-4xl lg:text-7xl font-bold text-white font-primary mb-6 leading-tight" 
            />

            {/* Project Description */}
            <p className="text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-8 font-light">
              Discover the innovative features, cutting-edge technology, and seamless user experience 
              that makes this project stand out in the digital landscape.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {project.liveLink && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link 
                        href={project.liveLink} 
                        target="_blank" 
                        className="group inline-flex items-center space-x-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105 font-semibold text-lg"
                      >
                        <FaLink className="text-xl group-hover:rotate-12 transition-transform duration-300" />
                        <span>Live Demo</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Experience the project live</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              {project.gitLink && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link 
                        href={project.gitLink} 
                        target="_blank" 
                        className="group inline-flex items-center space-x-3 px-8 py-4 bg-gray-800 hover:bg-gray-900 text-white rounded-full shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105 font-semibold text-lg"
                      >
                        <FaGithub className="text-xl group-hover:rotate-12 transition-transform duration-300" />
                        <span>View Repository</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Explore the repository</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>

            
            {/* Project Stats */}
            <div className="flex items-center justify-center space-x-8 mt-12 text-white/80">
              <div className="text-center">
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="text-green-400" />
                  <span className="text-lg font-medium">2025</span>
                </div>
              </div>
              <div className="w-2 h-2 bg-white/40 rounded-full"></div>
              <div className="text-center">
                <span className="text-lg font-medium">Full Stack Project</span>
              </div>
              <div className="w-2 h-2 bg-white/40 rounded-full"></div>
              <div className="text-center">
                <span className="text-lg font-medium">Modern Design</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {showImagePreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative max-w-6xl max-h-[90vh] mx-4">
            {/* Close Button */}
            <button
              onClick={closeImagePreview}
              className="absolute -top-12 right-0 text-white hover:text-red-400 transition-colors duration-200 z-10"
            >
              <FaTimes className="text-2xl" />
            </button>

            {/* Navigation Buttons */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-400 transition-colors duration-200 z-10 bg-black/50 rounded-full p-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-400 transition-colors duration-200 z-10 bg-black/50 rounded-full p-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Image */}
            <div className="relative">
              <Image
                src={project.images[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                width={1200}
                height={800}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
              
              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                {currentImageIndex + 1} / {project.images.length}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Content Section */}
      <div className="mx-auto">
        {/* Project Overview - Full Width */}
        <div className="my-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-5xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-4"></div>
              Project Overview
            </h3>
            <div 
              className="text-gray-700 leading-relaxed prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: sanitizedProjectDetails }}
            ></div>
          </div>
        </div>

        {/* Author and Project Details - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Enhanced Author Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-xl p-8 border border-blue-200 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-4"></div>
              Project Creator
            </h3>
            
            <div className="flex items-start space-x-4">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-30"></div>
                <Image
                  src="/assets/hero/dev.png"
                  alt={user?.name}
                  width={80}
                  height={80}
                  className="relative rounded-full shadow-lg ring-4 ring-white"
                />
              </div>
              
              <div className="flex-1 space-y-3">
                <div className="flex items-center space-x-2">
                  <FaUser className="text-blue-600" />
                  <span className="font-bold text-gray-900 text-lg">Mustakim Al Noman</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <FaEnvelope className="text-green-600" />
                  <a 
                    href="mailto:mustakimalnoman@gmail.com"
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                  >
                    mustakimalnoman@gmail.com
                  </a>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mt-3">
                  Full-stack developer passionate about creating innovative web solutions 
                  and bringing ideas to life through code.
                </p>
              </div>
            </div>
          </div>

          {/* Project Stats Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full mr-4"></div>
              Project Details
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Category</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {project?.category}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Status</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Completed
                </span>
              </div>
              
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600 font-medium">Year</span>
                <span className="text-gray-900 font-semibold">2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
