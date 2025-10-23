"use client"
import Card from "./Card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {motion , AnimatePresence} from "framer-motion";
import {FaHtml5, FaCss3,FaJs,FaReact, FaDocker } from 'react-icons/fa';
import { DiMongodb } from "react-icons/di";
import { SiExpress, SiPostgresql, SiPrisma, SiRedux, SiTypescript } from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";


const journey = [
    // experience

    {
        type: "experience",
        company:"Bytespate Limited",
        logoUrl: "/assets/journey/experience/bytespate.png",
        position: "Software Engineer",
        duration: "Nov 2024 - Present",
        description: "Built Full stack website using Next.js,Tailwind CSS,Typescript,Express,Mongoose,Prisma and PostgresSQL.Worked on scaleable,user firendly solution"
    },
    {
        type: "experience",
        company:"Private",
        logoUrl: "/assets/journey/experience/private.png",
        position: "Junior Software Developer",
        duration: "Sept 2023 - June 2024",
        description: "Built Full stack website using Next.js,Tailwind CSS,Typescript,Express and Mongoose.Worked on scaleable,user firendly solution"
    },

    {
        type: "experience",
        company:"a2i",
        logoUrl: "/assets/journey/experience/a2i.png",
        position: "Young Professional Intern",
        duration: "October 2022 - Jan 2023 ",
        description: "Manage (TOR)-Term Of Referance -(Data model,ER Diagram,Sequence Diagram) for software development."
    },

    
    
    // edducation
    {
        type: "education",
        institution:"Daffodil International University",
        logoUrl: "/assets/journey/education/diu.png",
        position: "Bsc In CSE",
        duration: "May 2016 - Jun 2021",
        description: "Complete undergradution degree in computer science and engineering form Daffodil International University"
    },
    {
        type: "education",
        institution:"Programming Hero",
        logoUrl: "/assets/journey/education/p-hero.png",
        position: "Web Develoment",
        duration: "Jan 2023 - Jun 2023",
        description: "Learning Mern Stack development concept,focusing on React ,Node.js and APIs. Completed hands-on projects to solidify skills"
    },

  

    // skills

    {
        type: "skills",
        name:"HTML",
        icon: <FaHtml5/>,
        duration: "Learn In 2022",
        description: "Crafted structured web content using HTML effectively for mordern website,ensuring semantic markup and accessibility."
    },

    {
        type: "skills",
        name:"CSS",
        icon: <FaCss3/>,
        position: "Bsc In CSE",
        duration: "Learn In 2022",
        description: "CSS (Cascading Style Sheets) is used to style and design web pages, controlling layout, colors, fonts, and responsiveness."
    },
    
    {
        type: "skills",
        name:"Javascript",
        icon: <FaJs/>,
        duration: "Learn In 2022",
        description: "JavaScript is a versatile programming language used to create interactive, dynamic web applications and enhance user experiences."
    },
    
    {
        type: "skills",
        name:"TypeScript",
        icon: <SiTypescript />,
        duration: "Learn In 2024",
        description: "To make my projects type sequerei lerned typescript and implement it in my project.It  is a superset of JavaScript, meaning it extends JavaScript by adding static types"
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
   {
    type: "skills",
    name: "Prisma",
    icon: <SiPrisma/>,
    duration: "Learn In 2025",
    description: "Prisma is a next-generation ORM that simplifies database access with type-safe queries and easy schema management."
  },
  { 
    type: "skills",
    name: "PostgreSQL",
    icon: <SiPostgresql/>,
    duration: "Learn In 2025",
    description: "PostgreSQL is a powerful open-source relational database system known for reliability, performance, and advanced SQL features."
  },
  {
    type: "skills",
    name: "Docker",
    icon: <FaDocker />,
    duration: "Learn In 2025",
    description: "Docker is a containerization platform that allows developers to package, deploy, and run applications in isolated environments."
    
  }
    

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
            <AnimatePresence>

            <motion.div 
            initial={{opacity:0, y:20}}
            animate={{opacity:1, y:0}}
            exit={{opacity:0,y:20}}
            transition={{duration:0.3}}
          >
            {journey
            .filter((item) =>item.type === "experience")
            .map((card, index) =>{
               return <Card key={index} {...card}/>
            })}
          </motion.div>

            </AnimatePresence>
         
        </TabsContent>

        <TabsContent value="education" className="w-full">
            <AnimatePresence>
            <motion.div
           initial={{opacity:0, y:20}}
           animate={{opacity:1, y:0}}
           exit={{opacity:0,y:20}}
           transition={{duration:0.3}}
          >
            {journey
            .filter((item) =>item.type === "education")
            .map((card, index) =>{
               return <Card key={index} {...card}/>
            })}
          </motion.div>
            </AnimatePresence>
         
        </TabsContent>
        
        <TabsContent value="skills" className="w-full">
        <AnimatePresence>
        <motion.div
           initial={{opacity:0, y:20}}
           animate={{opacity:1, y:0}}
           exit={{opacity:0,y:20}}
           transition={{duration:0.3}}
          >
            {journey
            .filter((item) =>item.type === "skills")
            .map((card, index) =>{
               return <Card key={index} {...card}/>
            })}
        </motion.div>
        </AnimatePresence>
        
        </TabsContent>
    </Tabs>
    </>
  )
}

export default Cards;