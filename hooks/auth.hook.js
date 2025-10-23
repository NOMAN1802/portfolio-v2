import { loginUser, registerUser } from "@/services/AuthService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";



export const useUserRegistration = () => {
  return useMutation({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("User registered successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserLogin = () => {
  return useMutation({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: () => {
      toast.success("User logged in successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};



