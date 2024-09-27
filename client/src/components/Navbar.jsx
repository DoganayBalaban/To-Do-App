import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "@/store/Auth";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useThemeStore from "@/store/Theme";
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
  const { theme, toggleTheme } = useThemeStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const slideVariants = {
    hidden: { x: "100vw" }, // Start outside of the screen on the right
    visible: { x: 0 }, // Slide in to the center
    exit: { x: "-100vw" }, // Slide out to the left
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
        <motion.div
          // Animating the background color based on theme
          animate={{
            backgroundColor: "#1F2937",
            color: theme === "light" ? "#000000" : "#ffffff",
          }}
          initial={false}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <motion.button
            // Button animation with hover effect
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="rounded-full"
            style={{
              fontSize: "16px",
              width: "40px",
              height: "40px",

              backgroundColor: theme === "light" ? "#000000" : "#ffffff",
              color: theme === "light" ? "#ffffff" : "#000000",
              border: "none",
              cursor: "pointer",
            }}
          >
            {theme == "light" ? "🌙" : "☀️"}
          </motion.button>
        </motion.div>
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
