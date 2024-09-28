import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import useTodoStore from "@/store/Todo";
import useThemeStore from "@/store/Theme";

const AddTask = () => {
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const { toast } = useToast();
  const { loading, error, addTodos, success } = useTodoStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const result = await addTodos(title, description, priority);
      if (result.success) {
        toast({
          title: "Task Added",
          description: "Task has been added successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      // Handle errors if needed
      console.log(error);
      toast({
        title: "Error",
        description: "An error occurred while adding the task.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Card className={theme == "dark" ? "bg-gray-600 h-[90vh]" : "h-[90vh]"}>
        <form onSubmit={handleAddTask}>
          <CardHeader>
            <CardTitle className={theme == "dark" ? "text-white" : ""}>
              Add New Task
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
                  htmlFor="description"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Enter task description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <Select onValueChange={(value) => setPriority(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link to="/home">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button>Add Task</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AddTask;
