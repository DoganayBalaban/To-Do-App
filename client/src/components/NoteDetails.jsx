import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TiDeleteOutline } from "react-icons/ti";
import useNoteStore from "@/store/Note";

import { BsListTask } from "react-icons/bs";
import ReactQuill from "react-quill";
import { IoIosClose } from "react-icons/io";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const NoteDetails = ({ note }) => {
  const { deleteNote, updateNote } = useNoteStore();
  const [updatedTitle, setUpdatedTitle] = useState(note.title);
  const [updatedBody, setUpdatedBody] = useState(note.body);
  const [updatedTags, setUpdatedTags] = useState([...note.tags]);
  const [tagInput, setTagInput] = useState("");
  const { toast } = useToast();
  const handleDelete = async (id) => {
    try {
      console.log("clicked");
      const success = await deleteNote(id);
      if (success) {
        toast({
          title: "Task Deleted",
          description: "Task has been delete successfully",
          variant: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Task Deleted Failed",
        description: "Task has been delete fail",
        variant: "danger",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const handleRemoveTag = (tagToRemove) => {
    setUpdatedTags(updatedTags.filter((tag) => tag !== tagToRemove));
  };
  const handleUpdateNote = async (
    id,

    updatedTitle,
    updatedBody,
    updatedTags
  ) => {
    try {
      const { success } = await updateNote(
        id,
        updatedTitle,
        updatedBody,
        updatedTags
      );
      if (success) {
        toast({
          title: "Task Updated",
          description: "Task has been update successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Task Updated Failed",
        description: "Task has been update fail",
        variant: "danger",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <Card key={note._id} className="bg-white shadow-md m-8 p-2">
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">{note.title}</h2>
          </div>
        </CardHeader>
        <CardContent>
          <div
            dangerouslySetInnerHTML={{ __html: note.body }} // HTML'yi render et
            className="prose"
          />
          <div className="flex flex-col gap-2 mt-3">
            <span className="text-xl font-bold">Tags</span>{" "}
            <ul>
              {note.tags.map((tag, index) => (
                <li key={index}>
                  <Badge key={index} className="p-1">
                    {tag}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <div className="flex justify-end space-x-2 p-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="">
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Edit Note</DialogTitle>
                <DialogDescription>
                  Make changes to your note here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    className="col-span-3"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                  />
                </div>
                <div className="">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <ReactQuill
                    theme="snow"
                    value={updatedBody}
                    onChange={setUpdatedBody}
                    placeholder="Write your note here..."
                  />
                </div>
                <div className="">
                  <Label htmlFor="" className="text-right">
                    Tags
                  </Label>
                  <Input
                    type="text"
                    value={tagInput}
                    onChange={(e) => {
                      setTagInput(e.target.value);
                    }}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="ml-2"
                    onClick={() => {
                      setUpdatedTags([...updatedTags, tagInput]);
                      setTagInput("");
                    }}
                  >
                    Add
                  </Button>
                  <div>
                    {updatedTags.map((tag, index) => (
                      <Badge key={index}>
                        {tag}{" "}
                        <IoIosClose
                          onClick={() => handleRemoveTag(tag)}
                          className="cursor-pointer"
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    onClick={() => {
                      handleUpdateNote(
                        note._id,
                        updatedTitle,
                        updatedBody,
                        updatedTags
                      );
                    }}
                    type="submit"
                  >
                    Save changes
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button
            onClick={() => handleDelete(note._id)}
            variant="destructive"
            size="sm"
            className="pointer-events-auto"
          >
            Delete
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default NoteDetails;
