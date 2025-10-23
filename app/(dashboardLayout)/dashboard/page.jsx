"use client"
import AnimatedText from '@/components/AnimatedText ';
import { useUser } from '@/context/user.provider';
import {motion} from "framer-motion"

const DashboardPage = () => {

  const { user, isLoading } = useUser();
  return (
    <div>
       <div className='flex-1 flex flex-col justify-center items-center md:ml-24 bg-gray-100'>
        {user && (
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.2 }}
            className='absolute top-12 text-center bg-gradient-to-r from-gray-400 via-gray-500 to-blue-300 hover:shadow-2xl shadow-lg rounded-lg p-4 md:max-w-2xl w-full flex flex-col items-center md:grid md:grid-cols-3 gap-4'
          >
           
            {/* Welcome Text */}
            <div className='col-span-2 flex flex-col justify-center'>
           

              <AnimatedText text="Welcome to dashboard" textStyles="font-primary text-4xl text-gray-100"/>
              <p className='text-xl font-primary text-gray-100'>{user?.name}</p>
            </div>

             {/* Profile Image */}
             <div className='col-span-1 flex justify-center md:justify-end'>
              <img
                src="/assets/hero/dev.png"
                alt='Profile'
                className='w-20 h-20 rounded-full object-cover'
              />
            </div>
          </motion.div>
        )}
    </div>
    </div>
  )
}

export default DashboardPage