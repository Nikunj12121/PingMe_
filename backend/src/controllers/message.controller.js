import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";



export const getUsersForSidebar = async(req,res)=>{
 
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers  = await User.find({_id: {$ne:loggedInUserId}}).select("-password");  //as neeed to show all chats except the one who is logged in
        res.status(200).json(filteredUsers);


    } catch(error){
        console.error("Error in getUsersForSidebar:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }

}


export const getMessages = async(req,res)=>{
 
    try{

        const {id:userToChatId} = req.params;
        const MyId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:MyId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:MyId}
            ]
        });

        res.status(200).json({messages});


    }catch(error){
        console.log("Error in getMessages controller:",error.message);
        res.status(500).json({error:"Internal server error"});
    }

}



export const sendMessage = async(req,res)=>{
 
    try{

        const { text, image } = req.body;
        // const {id,receiverId} = req.params;
        const {id: receiverId} = req.params;
        // const receiverId = req.params; chatgpt told
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            //upplad image to cloudinary,
            const uploadResponse = await cloudinary.uploader.upload(image); 
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        });

        await newMessage.save();

        //todo realtime fn goes here => SOCKET.IO

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }


        res.status(201).json({newMessage});
        // res.status(201).json(newMessage); told by gpt but didn't work


    }catch(error){
        console.log("Error in sendMessage controller:",error.message);
        res.status(500).json({error:"Internal server error"});
    }

}

