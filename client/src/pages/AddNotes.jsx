import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import { Editor } from "primereact/editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import useNoteStore from "@/store/Note";

const AddNotes = () => {
  const { toast } = useToast();
  const { addNotes } = useNoteStore();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleAddNote = async (e) => {
    e.preventDefault();
    try {
      const result = await addNotes(title, body);
      if (result.success) {
        toast({
          title: "Note Added",
          description: "Note has been added successfully",
          variant: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while adding the note.",
        variant: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <Card className="">
        <form onSubmit={handleAddNote}>
          <CardHeader>
            <CardTitle>Add New Note</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="body">Body</Label>
                {/* editör kullanarak çöz şunu */}
                <ReactQuill
                  theme="snow"
                  value={body}
                  onChange={setBody}
                  style={{ height: "300px" }}
                  placeholder="Write your note here..."
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between mt-6">
            <Link to="/notes">
              <Button variant="outline">Back</Button>
            </Link>
            <Button>Add Note</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AddNotes;