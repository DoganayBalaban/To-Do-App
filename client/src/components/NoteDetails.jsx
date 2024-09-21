import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TiDeleteOutline } from "react-icons/ti";
import useNoteStore from "@/store/Note";
import { BsListTask } from "react-icons/bs";
import ReactQuill from "react-quill";

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

const NoteDetails = ({ note }) => {
  const { deleteNote, updateNote } = useNoteStore();
  const [updatedTitle, setUpdatedTitle] = useState(note.title);
  const [updatedBody, setUpdatedBody] = useState(note.body);
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
  const handleUpdateNote = async (
    id,

    updatedTitle,
    updatedBody
  ) => {
    try {
      const { success } = await updateNote(id, updatedTitle, updatedBody);
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
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    onClick={() => {
                      handleUpdateNote(note._id, updatedTitle, updatedBody);
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
