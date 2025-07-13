import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set)=>({

    authUser:null,
    isSigningUp:false,
    isLoggingIng:false,
    isUpdatingProfile:false,

    isCheckingAuth:true,

    checkAuth: async()=>{

        try{    

        const res = await axiosInstance.get("/auth/check");
        if (res.data && res.data._id) { // or check res.data.email / name etc.
        set({ authUser: res.data });
        } else {
        set({ authUser: null });
        }


        }catch(error){
            console.log("Error in checkAuth:", error);
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }

    },

    signup: async(data)=>{

        set({ isSigningUp: true});

        try{
            const res = await axiosInstance.post("/auth/signup",data);
            set({authUser: res.data});
            toast.success("Account created successfully");

        }catch (error) {
  console.log("Signup error:", error); // Full error object
  console.log("Backend message:", error?.response?.data); // Specific response message if available

  toast.error(error?.response?.data?.message || "Signup failed. Please try again.");
}

finally{
            set({ isSigningUp: false });
        }

    },

    logout: async () => {
        try{

            await axiosInstance.post("/auth/logout");
            set({ authUser: null });

        } catch(error){

            toast.error(error.response.data.message);

        }
    }


}));