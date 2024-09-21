import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TiDeleteOutline } from "react-icons/ti";
import useTodoStore from "@/store/Todo";
import { BsListTask } from "react-icons/bs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const Task = ({ todo }) => {
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);
  const [completed, setCompleted] = useState(todo.completed);
  const [updatedDescription, setUpdatedDescription] = useState(
    todo.description
  );
  const [updatedPriority, setUpdatedPriority] = useState(todo.priority);
  const { toast } = useToast();
  const { deleteTodo, updateTodo } = useTodoStore();

  const handleDeleteTodo = async (id) => {
    const success = await deleteTodo(id);
    if (success) {
      toast({
        title: "Task Deleted",
        description: "Task has been delete successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const handleUpdateTodo = async (
    id,
    completed,
    updatedTitle,
    updatedDescription,
    updatedPriority
  ) => {
    const { success } = await updateTodo(
      id,
      completed,
      updatedTitle,
      updatedDescription,
      updatedPriority
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
  };

  return (
    <>
      <TableRow key={todo._id} className={todo.completed ? "opacity-50" : ""}>
        <TableCell>
          <Checkbox checked={completed} />
        </TableCell>
        <TableCell className="font-medium">{todo.title}</TableCell>
        <TableCell>{todo.description}</TableCell>
        <TableCell className="text-right">
          {new Date(todo.date).toLocaleDateString("tr-TR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </TableCell>
        <TableCell className="text-right">
          <Badge variant={todo.priority === "high" ? "destructive" : ""}>
            {todo.priority}
          </Badge>
        </TableCell>
        <TableCell className="flex justify-end ">
          <Button className="me-4" onClick={() => handleDeleteTodo(todo._id)}>
            <TiDeleteOutline className="w-6 h-6" />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="" variant="">
                Edit Todo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Todo</DialogTitle>
                <DialogDescription>
                  Make changes to your todo here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col space-y-2">
                <div className="grid grid-cols-4 items-center gap-4">
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
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    className="col-span-3"
                    value={updatedDescription}
                    onChange={(e) => setUpdatedDescription(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Priority</Label>
                  <Select onValueChange={(value) => setUpdatedPriority(value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={updatedPriority} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-start gap-4">
                  <Label className="text-right">Completed</Label>
                  <Checkbox
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                  />
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    onClick={() => {
                      handleUpdateTodo(
                        todo._id,
                        completed,
                        updatedTitle,
                        updatedDescription
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
        </TableCell>
      </TableRow>
    </>
  );
};

export default Task;
