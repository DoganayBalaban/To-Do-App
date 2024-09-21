import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAuthStore from "@/store/Auth";
const login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, error } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);
  return (
    <div
      className="flex flex-col justify-center items-center h-[90vh] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.ctfassets.net/lzny33ho1g45/O6Ns6DttUzJym7rhGiD36/b1cc4e063288e5161b14edad3569c5cb/best-to-do-list-apps.jpg?w=1520&fm=jpg&q=30&fit=thumb&h=760')",
      }}
    >
      <div className="flex justify-center items-center h-screen ">
        <Card className="w-[400px] p-4">
          <CardHeader>
            <CardTitle className="text-2xl">Giriş Yap</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="password">Şifre</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 text-white">
                Giriş Yap
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-sm text-gray-600">
            {error && <div>{error}</div>}
            Hesabınız yok mu?{" "}
            <Link to="/register" className="text-blue-500">
              Kayıt Ol
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default login;
