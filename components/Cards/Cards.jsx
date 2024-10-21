"use client"
import Card from "./Card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {motion , AnimatePresence} from "framer-motion";
import {FaHtml5, FaCss3,FaJs,FaReact, FaWordpress,FaFigma } from 'react-icons/fa';
import { DiMongodb } from "react-icons/di";
import { SiExpress, SiRedux } from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";

const journey = [
    // experience
    {
        type: "experience",
        company:"Private",
        logoUrl: "/assets/journey/experience/logo-1.svg",
        position: "Web Developer",
        duration: "Sept 2023 - present",
        description: "Built website and web app using Next.js,Tailwind CSS, and Javascript.Worked on scaleable,user firendly solution"
    },

    {
        type: "experience",
        company:"a2i",
        logoUrl: "/assets/journey/experience/logo-2.svg",
        position: "Frontend Developer",
        duration: "Jan 2022 - Sept 2023 ",
        description: "Developed responsive website with HTML,CSS and Javascript.Ensure seamless user experiences."
    },

    
    
    // edducation
   
    {
        type: "education",
        institution:"Programming Hero",
        logoUrl: "/assets/journey/education/logo-1.svg",
        position: "Web Develoment",
        duration: "Jan 2023 - Jun 2023",
        description: "Learning Mern Stack development concept,focusing on React ,Node.js and APIs. Completed hands-on projects to solidify skills"
    },

    {
        type: "education",
        institution:"Daffodil International University",
        logoUrl: "/assets/journey/education/institution.svg",
        position: "Bsc In CSE",
        duration: "May 2016 - Jun 2021",
        description: "Complete undergradution degree in computer science and engineering form Daffodil International University"
    },

    // skills

    {
        type: "skills",
        name:"HTML",
        icon: <FaHtml5/>,
        duration: "Learn In 2020",
        description: "Crafted structured web content using HTML effectively for mordern website,ensuring semantic markup and accessibility."
    },

    {
        type: "skills",
        name:"CSS",
        icon: <FaCss3/>,
        position: "Bsc In CSE",
        duration: "Learn In 2020",
        description: "CSS (Cascading Style Sheets) is used to style and design web pages, controlling layout, colors, fonts, and responsiveness."
    },
    
    {
        type: "skills",
        name:"Javascript",
        icon: <FaJs/>,
        duration: "Learn In 2021",
        description: "JavaScript is a versatile programming language used to create interactive, dynamic web applications and enhance user experiences."
    },
    
    {
        type: "skills",
        name:"React.js",
        icon: <FaReact/>,
        duration: "Learn In 2023",
        description: "React is a JavaScript library for building dynamic, component-based user interfaces with efficient rendering and state management."
    },
    {
        type: "skills",
        name:"Wordpress",
        icon: <FaWordpress/>,
        duration: "Learn In 2024",
        description: "WordPress is a popular content management system (CMS) for building websites, offering customization through themes and plugins."
    },

    {
        type: "skills",
        name:"Figma",
        icon: <FaFigma/>,
        duration: "Learn In 2024",
        description: "Figma is a collaborative design tool for creating user interfaces, wireframes, prototypes, and visual assets online."
    },
    {
        type: "skills",
        name:"Next Js",
        icon: <RiNextjsFill />,
        duration: "Learn In 2024",
        description: "Next.js is a React framework for building fast, server-rendered applications with routing, APIs, and static site generation."
    },
    {
        type: "skills",
        name:"Redux",
        icon: <SiRedux />,
        duration: "Learn In 2024",
        description: "Redux is a state management library for JavaScript apps, providing a predictable, centralized store for state management."
    },
    {
        type: "skills",
        name:"Express Js",
        icon: <SiExpress />,
        duration: "Learn In 2023",
        description: "Express.js is a minimal, fast web framework for Node.js, used to build APIs and web applications."
    },
    {
        type: "skills",
        name:"Mongodb",
        icon: <DiMongodb />,
        duration: "Learn In 2023",
        description: "MongoDB is a NoSQL database that stores data in flexible, JSON-like documents for scalable, high-performance applications."
    },
    
    

]

const Cards = () => {
  return (
    <>
    <Tabs defaultValue="experience" className="w-full flex flex-col items-center"> 
        <TabsList className="max-w-max mb-[30px]">
            <TabsTrigger value="experience">
                Experience
            </TabsTrigger>

            <TabsTrigger value="education">
                Education
            </TabsTrigger>

            <TabsTrigger value="skills">
                My Skills
            </TabsTrigger>
        </TabsList>
        <TabsContent value="experience" className="w-full">
          <div>
            {journey
            .filter((item) =>item.type === "experience")
            .map((card, index) =>{
               return <Card key={index} {...card}/>
            })}
          </div>
        </TabsContent>

        <TabsContent value="education" className="w-full">
          <div>
            {journey
            .filter((item) =>item.type === "education")
            .map((card, index) =>{
               return <Card key={index} {...card}/>
            })}
          </div>
        </TabsContent>
        <TabsContent value="skills" className="w-full">
          <div>
            {journey
            .filter((item) =>item.type === "skills")
            .map((card, index) =>{
               return <Card key={index} {...card}/>
            })}
          </div>
        </TabsContent>
    </Tabs>
    </>
  )
}

export default Cards;