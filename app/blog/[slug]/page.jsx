"use client"
import Container from '@/components/Container/Container';
import PostDetails from '@/components/PostDetails/PostDetails';
import { getPost } from '@/services/PostService';

import React, { useEffect, useState } from 'react'

const SinglePostPage = ({ params }) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch post details and set in state
  const fetchPost= async () => {
    try {
      const { data: postData } = await getPost(params.slug);
      console.log(postData)

      setPost(postData);
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPost();
  }, [params.postId]);


  if (loading) {
    return (
      <div className="h-screen bg-black/10 fixed inset-0 z-[999] backdrop-blur-md flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-default-500" />
      </div>
    );
  }
  console.log(post)

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <Container>
        
        <PostDetails post={post} refetchPost={fetchPost}/>
     </Container>
  )
}

export default SinglePostPage;