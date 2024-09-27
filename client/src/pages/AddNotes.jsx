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
import useThemeStore from "@/store/Theme";

const AddNotes = () => {
  const { toast } = useToast();
  const { addNotes } = useNoteStore();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const { theme } = useThemeStore();
  const handleAddNote = async (e) => {
    e.preventDefault();
    try {
      const result = await addNotes(title, body, tags);
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
  const handleAddTag = () => {
    if (tagInput.trim()) {
      // Tag'i array'e ekle ve inputu temizle
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  return (
    <div>
      <Card className={theme == "dark" ? "bg-gray-600 h-[90vh]" : "h-[90vh]"}>
        <form onSubmit={handleAddNote}>
          <CardHeader>
            <CardTitle className={theme == "dark" ? "text-white" : ""}>
              Add New Note
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label
                  className={theme == "dark" ? "text-white" : ""}
                  htmlFor="title"
                >
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label
                  className={theme == "dark" ? "text-white" : ""}
                  htmlFor="body"
                >
                  Body
                </Label>
                {/* editör kullanarak çöz şunu */}
                <ReactQuill
                  theme="snow"
                  value={body}
                  onChange={setBody}
                  className={
                    theme == "dark" ? "bg-gray-200 h-64 text-white" : "h-64"
                  }
                  placeholder="Write your note here..."
                />
              </div>
              <div>
                <Label className={theme == "dark" ? "text-white" : ""}>
                  Tags
                </Label>
                <Input
                  type="text"
                  placeholder="Add Tags (press enter)"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                />
                <Button onClick={handleAddTag}>Add</Button>
              </div>
              <div>
                {tags.map((tag, index) => (
                  <span key={index}>{tag},</span>
                ))}
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
