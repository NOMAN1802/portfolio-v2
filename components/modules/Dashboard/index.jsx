"use client";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineBars } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import SidebarOptions from "./SidebarOptions";
import { adminLinks } from "./constants";
import Container from "@/components/Container/Container";
import { useUser } from "@/context/user.provider";
import { useRouter } from "next/navigation";
import { logout } from "@/services/AuthService";
import { toast } from "sonner";



const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser(); 
  const router = useRouter(); 

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    toast.success('Successfully logged out!') 
    router.push("/"); 
  };

  return (
    <Container>
      {/* Small Screen Navbar */}
      {!isOpen && (
        <button
          className="mobile-menu-button focus:outline-none focus:bg-accent/20"
          onClick={toggleSidebar}
        >
          <AiOutlineBars className="h-6 w-6 text-primary" />
        </button>
      )}

      {/* Sidebar for Small Devices */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            animate={{ x: 0 }}
            className="z-10 md:hidden flex flex-col justify-between overflow-x-hidden bg-accent/20 w-64 space-y-6 px-2 py-4 fixed inset-y-0 left-0 transform transition duration-200 ease-in-out"
            exit={{ x: "-100%" }}
            initial={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Sidebar Button */}
            <button
              className="absolute top-4 right-4 z-20 p-2"
              onClick={closeSidebar}
            >
              <svg
                className="h-6 w-6 text-black"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 18L18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Sidebar Content */}
            <div className="flex-grow">
              <Link
                className="flex justify-center items-center flex-col"
                href="/"
              >
                <h2 className="text-3xl font-bold text-black">
                  <span className="font-primary">Noman</span>
                </h2>
              </Link>
              <div className="flex flex-col items-center mt-4">
              <img
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover"
                   src="/assets/hero/dev.png"/>
                <p className="mt-2 text-lg font-primary">
                  {user?.name}
                </p>
              </div>
              <SidebarOptions closeSidebar={closeSidebar} links={adminLinks} />
            </div>

            {/* Logout and Home Links */}
            <div>
              <hr />
              <button
                className="flex w-full items-center px-4 py-2 mt-5 text-primary hover:bg-default-300 hover:text-default-700 transition-colors duration-300 transform"
                onClick={handleLogout}
              >
                <MdLogout className="w-6 h-6" />
                <span className="mx-4 font-primary">Logout</span>
              </button>
              <Link
                className="flex w-full items-center px-4 py-2 mt-5 text-primary hover:bg-default-300 hover:text-default-700 transition-colors duration-300 transform"
                href="/"
                onClick={closeSidebar}
              >
                <FaHome className="w-6 h-6" />
                <span className="mx-4 font-primary">Home</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Always visible sidebar for large screens */}
      <div className="hidden md:flex md:fixed md:flex-col md:justify-between md:overflow-x-hidden md:bg-accent/20 md:w-64 md:space-y-6 md:px-2 md:py-4 md:inset-y-0 md:left-0">
        <div>
          <Link
            className="flex-grow flex justify-center items-center flex-col"
            href="/"
          >
            <h2 className="text-3xl font-bold text-black">
              <span className="font-primary">Noman</span>
            </h2>
          </Link>
          <div className="flex flex-col items-center mt-4">
          <img
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover"
                   src="/assets/hero/dev.png"/>
            <p className="mt-2 text-lg font-primary text-default-700">
              {user?.name}
            </p>
          </div>
          <SidebarOptions links={adminLinks} />
        </div>
        <div>
          <hr />

          <Link
            className="flex w-full items-center px-4 py-2 mt-5 text-primary hover:bg-default-300 hover:text-default-700 transition-colors duration-300 transform"
            href="/"
          >
            <FaHome className="w-6 h-6" />
            <span className="mx-4 font-primary">Home</span>
          </Link>
          <button
            className="flex w-full items-center px-4 py-2 mt-5 text-primary hover:bg-default-300 hover:text-default-700 transition-colors duration-300 transform"
            onClick={handleLogout}
          >
            <MdLogout className="w-6 h-6" />
            <span className="mx-4 font-primary">Logout</span>
          </button>
          
        </div>
      </div>
    </Container>
  );
};

export default Sidebar;
