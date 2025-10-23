"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineAttachEmail } from "react-icons/md";
import { AiOutlineLock } from "react-icons/ai";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import Loading from "@/components/Loading/Loading";
import Container from "@/components/Container/Container";
import { useForm } from "react-hook-form"; 
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import AnimatedText from "@/components/AnimatedText ";
import { useUserRegistration } from "@/hooks/auth.hook";

const RegisterPage = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const router = useRouter();
  
  const { mutate: handleUserRegister, isPending, isSuccess } = useUserRegistration(); 

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    handleUserRegister(data); 
    
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      router.push("/login"); 
    }
  }, [isPending, isSuccess]);

  const handleViewPassword = () => {
    setViewPassword(!viewPassword);
  };

  return (
    <Container>
      {isPending && <Loading />}

      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <AnimatedText text="Register an account" textStyles="h1 mb-2" />
        
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          
          {/* Name Input */}
          <div className="p-4">
            <div className="relative">
              <FaUserAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10"  
                type="text"
                placeholder="Name"
                {...register("name", { required: "Name is required" })}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Input */}
          <div className="p-4">
            <div className="relative">
              <MdOutlineAttachEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10"  
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="p-4">
            <div className="relative">
              <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10 pr-10"  
                type={viewPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={handleViewPassword}>
                {viewPassword ? <BsEyeSlash /> : <BsEye />}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center p-4">
            <Button className="w-full rounded-md bg-accent/80 font-semibold  p-2" type="submit">
              Register
            </Button>
          </div>

          {/* Redirect to login */}
          <div className="text-center">
            <p className="text-xl text-default-600 my-4">OR</p>
            <Link href="/login">
              <p className="mt-4 text-center">
                Already have an account?{" "}
                <span className="text-default-400 hover:underline cursor-pointer">
                  Login
                </span>
              </p>
            </Link>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default RegisterPage;
