"use client"
import { useGetAllPosts } from '@/hooks/post.hook';
import BlogItem from './BlogItem';
import { useState } from 'react';
import {motion,AnimatePresence } from "framer-motion";
import {Tabs,TabsContent,TabsList,TabsTrigger} from "@/components/ui/tabs";
import AnimatedText from "../AnimatedText ";


const Blog = () => {

  const { data: myBlogs, isLoading } = useGetAllPosts();
  const data = myBlogs?.data?.posts;
  console.log(data);

  // execute unique categories from the data

  const uniqueCategories = Array.from(new Set(data?.map((item)=> item.category ))
);

// create tab data with "all" category and unique categories from data
 const tabData = [
  {category: "all"},
  ...uniqueCategories.map((category) =>({category})),
 ];
//  state to manage the currently selected tab
const [tabValue, setTabValue] = useState("all");
// number of items to show initially 
const [visibleItem , setVisibleItem] = useState(6);

// filter work items based on the selected tab

const filterBlog = 
tabValue === "all"
? data?.filter((item) => item.category !== "all")
: data?.filter((item) => item.category === tabValue);

const loadMoreItems = () => {
  // adjust the number to control how many items are loaded at a time
  setVisibleItem((prev) => prev + 2);
}
  return (
    <section className='pt-24 min-h-screen' id='blog' >
       <div className="container mx-auto">
        <Tabs defaultValue="all" className="w-full flex flex-col">
         <div className="flex flex-col xl:flex-row items-center xl:items-start
         xl:justify-between mb-[30px]">
          <AnimatedText text="My Latest Blog" textStyles="h2 mb-[30px] xl:mb-0"/>

          {/* render tab trigger */}
          <TabsList className="max-w-max h-full mb-[30px] flex flex-col md:flex-row
          gap-4 md:gap-0">
            {tabData?.map((item,index)=> {
              return (
              <TabsTrigger value={item.category}
               key={index} 
               className="capitalize w-[120px]"
               onClick={() => setTabValue(item.category)}
               >
                {item.category}
                </TabsTrigger>
                );
            })}
          </TabsList>
         </div>

         {/* render content for the selected tab */}
         <TabsContent value={tabValue} className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px]">
              <AnimatePresence>
                {filterBlog?.slice(0,visibleItem).map((item,index) =>(
                  <motion.div key={index}
                   initial={{opacity: 0,y:20}}
                   animate={{opacity: 1, y:0}}
                   transition={{duration: 0.3}}
                  >
                    <BlogItem {...item}/>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {/* Load more button */}
            {visibleItem < filterBlog?.length && (

              <div className="flex justify-center mt-12">
                <button onClick={loadMoreItems} className="btn btn-accent">
                 Load more
                </button>
              </div>
            )}
         </TabsContent>
        </Tabs>
       </div>
    </section>
    
  )
}

export default Blog;