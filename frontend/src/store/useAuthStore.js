import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import {io} from "socket.io-client";

const BASE_URL = "http://localhost:5001";

export const useAuthStore = create((set,get)=>({

    authUser:null,
    isSigningUp:false,
    isLoggingIng:false,
    isUpdatingProfile:false,

    isCheckingAuth:true,
    onlineUsers:[],
    socket:null,

    checkAuth: async()=>{

        try{    

        const res = await axiosInstance.get("/auth/check");
        // if (res.data && res.data._id) { // or check res.data.email / name etc.
        // set({ authUser: res.data });
        // } else {
        // set({ authUser: null });
        // }
      set({ authUser: res.data });
      get().connectSocket();


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
            get().connectSocket();

        }catch (error) {
  console.log("Signup error:", error); // Full error object
  console.log("Backend message:", error?.response?.data); // Specific response message if available

  toast.error(error?.response?.data?.message || "Signup failed. Please try again.");
}

finally{
            set({ isSigningUp: false });
        }

    },


  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
      logout: async () => {
        try{

            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
            get().disconnectSocket();

        } catch(error){

            toast.error(error.response.data.message);

        }
    },

    updateProfile: async(data) => {

        set({ isUpdatingProfile:true });

        try{
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data});
            toast.success("Profile updated successfully");
        } catch(error){
            console.log("error in update profile",error);
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingProfile: false });
        }

    },

    connectSocket: () => {
        const {authUser} = get();
        if(!authUser || get().socket.connected) return;

        const socket = io(BASE_URL);
        socket.connect();

        set({ socket:socket });

    },
    
    disconnectSocket: () => {

        if(get().socket?.connected) get().socket.disconnect();

    }


}));