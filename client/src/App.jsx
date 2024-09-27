import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Index from "./pages/index";
import Navbar from "./components/Navbar";
import AddTask from "./pages/AddTask";
import { Toaster } from "@/components/ui/toaster";
import Notes from "./pages/Notes";
import AddNotes from "./pages/AddNotes";
import useAuthStore from "./store/Auth";
import Profile from "./pages/Profile";
import useThemeStore from "./store/Theme";

const App = () => {
  const { getUser, user } = useAuthStore();
  const { theme } = useThemeStore();
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className={theme == "dark" ? "bg-gray-500" : "bg-white"}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/add-note" element={<AddNotes />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
