"use client"
import Container from '@/components/Container/Container';
import ProjectDetails from '@/components/ProjectDetails/ProjectDetails';
import { getProject } from '@/services/ProjectService';
import React, { useEffect, useState } from 'react'

const SingleProjectPage = ({ params }) => {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch post details and set in state
  const fetchProject = async () => {
    try {
      const { data: projectData } = await getProject(params.projectId);
      console.log(projectData)

      setProject(projectData);
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch project on component mount
  useEffect(() => {
    fetchProject();
  }, [params.projectId]);

  if (loading) {
    return (
      <div className="h-screen bg-black/10 fixed inset-0 z-[999] backdrop-blur-md flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-default-500" />
      </div>
    );
  }

  if (!project) {
    return <div>Post not found</div>;
  }

  return (
    <Container>
        <ProjectDetails project={project} refetchProject={fetchProject}/>
     </Container>
  )
}

export default SingleProjectPage;