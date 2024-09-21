import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "@/store/Auth";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center h-[10vh] py-4 px-8 bg-gray-800 text-white">
      {/* Sol taraf */}
      <div className="text-xl font-bold">
        <Link to="/">TodoApp</Link>{" "}
        <Link to="/home">
          <Button
            variant={location.pathname === "/home" ? "secondary" : "primary"}
          >
            To-do
          </Button>
        </Link>
        <Link to="/notes">
          <Button
            variant={location.pathname === "/notes" ? "secondary" : "primary"}
          >
            My Notes
          </Button>
        </Link>
      </div>

      {/* Sağ taraf */}
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center text-center space-x-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-sm">{user?.name}</p>
                  <Badge>{user?.role}</Badge>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link to="/profile">
                <DropdownMenuItem>My Profile</DropdownMenuItem>
              </Link>
              <Link to="/notes">
                <DropdownMenuItem>My Notes</DropdownMenuItem>
              </Link>
              <Link to="/home">
                <DropdownMenuItem>My To-Do's</DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link to="/login">
              <Button variant="primary">Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="primary">Register</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
