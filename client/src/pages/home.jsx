import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import useTodoStore from "@/store/Todo";
import { Button } from "@/components/ui/button";
import Task from "@/components/Task";
import logo from "../assets/Spinner@1x-1.8s-200px-200px.gif";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationDetail from "@/components/PaginationDetail";
const home = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const {
    getTodos,
    loading,
    error,
    todos,
    setSort,
    setFilter,
    setPage,
    page,
    totalPages,
    sortBy,
    order,
  } = useTodoStore();

  useEffect(() => {
    getTodos();
  }, [page, sortOrder]);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={logo}></img>
      </div>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }
  const handleSort = (sortBy) => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc"; // Yönü değiştir
    setSortOrder(newOrder); // Yönü state'e kaydet
    setSort(sortBy, newOrder); // Store'a sıralama işlemi gönder
  };

  return (
    <div>
      <Link to="/add-task">
        <Button className="m-2 p-2 float-end flex flex-column">
          <IoMdAddCircleOutline className="me-1" />
          Add Task
        </Button>
      </Link>
      <Table>
        <TableCaption>Your current todo list.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Done</TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Description</TableHead>
            <TableHead
              onClick={() => handleSort("date")}
              className="text-right cursor-pointer"
            >
              Added Date {sortOrder === "asc" ? "▲" : "▼"}
            </TableHead>
            <TableHead
              onClick={() => handleSort("priority")}
              className="text-right cursor-pointer"
            >
              Priority {sortOrder === "asc" ? "▲" : "▼"}
            </TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.map((todo) => (
            <Task key={todo._id} todo={todo} />
          ))}
        </TableBody>
      </Table>
      {/* <PaginationDetail /> */}
      <div className="text-center flex flex-row gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i}
            onClick={() => setPage(i + 1)}
            disabled={page === i + 1}
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default home;
