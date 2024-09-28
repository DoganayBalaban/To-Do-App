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
import useThemeStore from "@/store/Theme";
const home = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const {
    getTodos,
    loading,
    error,
    todos,
    setSort,
    checkedFilter,
    toggleCheckedFilter,
    setPage,
    page,
    totalPages,
    sortBy,
    order,
  } = useTodoStore();
  const { theme } = useThemeStore();
  useEffect(() => {
    getTodos();
  }, [page, sortOrder]);
  if (loading) {
    return (
      <div
        className={
          theme == "dark"
            ? "bg-[#6A7280] flex justify-center items-center h-screen"
            : "flex justify-center items-center h-screen"
        }
      >
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
      <div className="flex flex-row m-2 p-2">
        <div className="m-2">
          <Button>Checked</Button>
        </div>
        <Link to="/add-task">
          <Button className=" float-end m-2">
            <IoMdAddCircleOutline className="" />
            Add Task
          </Button>
        </Link>
      </div>
      <Table>
        <TableCaption>Your current todo list.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className={theme == "dark" ? "text-black" : ""}>
              Done
            </TableHead>
            <TableHead className={theme == "dark" ? "text-black" : ""}>
              Task
            </TableHead>
            <TableHead className={theme == "dark" ? "text-black" : ""}>
              Description
            </TableHead>
            <TableHead
              onClick={() => handleSort("date")}
              className={
                theme == "dark"
                  ? "text-black cursor-pointer text-right"
                  : "cursor-pointer text-right"
              }
            >
              Added Date {sortOrder === "asc" ? "▲" : "▼"}
            </TableHead>
            <TableHead
              onClick={() => handleSort("priority")}
              className={
                theme == "dark"
                  ? "text-black cursor-pointer text-right"
                  : "cursor-pointer text-right"
              }
            >
              Priority {sortOrder === "asc" ? "▲" : "▼"}
            </TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos?.map((todo) => (
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
