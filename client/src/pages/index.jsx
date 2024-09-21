import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useAuthStore from "@/store/Auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Index = () => {
  const { isAuthenticated } = useAuthStore();
  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.ctfassets.net/lzny33ho1g45/O6Ns6DttUzJym7rhGiD36/b1cc4e063288e5161b14edad3569c5cb/best-to-do-list-apps.jpg?w=1520&fm=jpg&q=30&fit=thumb&h=760')",
      }}
      className=" h-[90vh] bg-cover bg-center"
    >
      <Card className="w-[350px]  h-[80vh] float-start m-10 bg-white bg-opacity-90 shadow-lg rounded-lg text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Doğanay To-Do</CardTitle>
        </CardHeader>

        {isAuthenticated ? (
          <>
            <CardContent>
              <p className="text-sm text-gray-600 text-start">
                Kullanmaya başlayın.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Link to="/home">
                <Button
                  className=" text-white font-bold py-
                2 px-4 rounded w-[200px]"
                >
                  Görevler
                </Button>
              </Link>
              <Link to="/notes">
                <Button
                  className=" text-white font-bold py-
                2 px-4 rounded w-[200px]"
                >
                  Notlarım
                </Button>
              </Link>
            </CardFooter>
          </>
        ) : (
          <>
            <CardContent>
              <p className="text-sm text-gray-600">
                Kullanmak için giriş yapın..
              </p>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Link to="/login">
                <Button className="w-[200px]">Giriş Yap</Button>
              </Link>
              <Link to="/register">
                <Button className="w-[200px]">Kayıt Ol</Button>
              </Link>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
};

export default Index;
