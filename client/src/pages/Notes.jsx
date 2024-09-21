import { Card, CardHeader, CardContent } from "@/components/ui/card"; // ShadCN UI bileşenleri
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useNoteStore from "@/store/Note";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import NoteDetails from "@/components/NoteDetails";
import logo from "../assets/Spinner@1x-1.8s-200px-200px.gif";

const Notes = () => {
  const { notes, getNotes, loading } = useNoteStore();
  useEffect(() => {
    getNotes();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={logo}></img>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="container mx-auto">
        <Link to="/add-note">
          <Input
            className="p-5 m-5 shadow-md shadow-gray-200 hover:shadow-black"
            placeholder="Write a new note ..."
          ></Input>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <NoteDetails key={note._id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default Notes;
