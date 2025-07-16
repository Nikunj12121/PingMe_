import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  // Existing Male Users
  {
    email: "james.anderson@example.com",
    fullName: "James Anderson",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    email: "william.clark@example.com",
    fullName: "William Clark",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    email: "benjamin.taylor@example.com",
    fullName: "Benjamin Taylor",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    email: "lucas.moore@example.com",
    fullName: "Lucas Moore",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    email: "henry.jackson@example.com",
    fullName: "Henry Jackson",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    email: "alexander.martin@example.com",
    fullName: "Alexander Martin",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    email: "daniel.rodriguez@example.com",
    fullName: "Daniel Rodriguez",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
  },

  // New Male Users
  {
    email: "michael.hall@example.com",
    fullName: "Michael Hall",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/8.jpg",
  },
  {
    email: "ethan.lee@example.com",
    fullName: "Ethan Lee",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/9.jpg",
  },
  {
    email: "logan.young@example.com",
    fullName: "Logan Young",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    email: "sebastian.king@example.com",
    fullName: "Sebastian King",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    email: "jack.wright@example.com",
    fullName: "Jack Wright",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    email: "leo.green@example.com",
    fullName: "Leo Green",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/13.jpg",
  },
  {
    email: "owen.scott@example.com",
    fullName: "Owen Scott",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/14.jpg",
  },
    {
    email: "ryan.baker@example.com",
    fullName: "Ryan Baker",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/15.jpg",
  },
  {
    email: "nathan.walker@example.com",
    fullName: "Nathan Walker",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/16.jpg",
  },
  {
    email: "aaron.turner@example.com",
    fullName: "Aaron Turner",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/17.jpg",
  },
  {
    email: "julian.perez@example.com",
    fullName: "Julian Perez",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/18.jpg",
  },
  {
    email: "adrian.campbell@example.com",
    fullName: "Adrian Campbell",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/19.jpg",
  },

];


const seedDatabase = async () => {
  try {
    await connectDB();
      // await User.deleteMany({});
    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function





seedDatabase();