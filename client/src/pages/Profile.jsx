import React, { useState, useEffect } from "react";
import useAuthStore from "@/store/Auth";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "../assets/Spinner@1x-1.8s-200px-200px.gif";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Profile = () => {
  const navigate = useNavigate();
  const { updateProfile, loading, user, success } = useAuthStore();
  const { toast } = useToast();
  const [update, setUpdate] = useState(0);
  const [name, setName] = useState(user?.name || "");
  const handleUpdate = async (name) => {
    try {
      await updateProfile(name); // Sonucu bekle
      if (success) {
        // Kullanıcı güncellenmişse
        toast({
          title: "Name Updated",
          description: "Name has been updated successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        // Yönlendirmeyi burada yap
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Name Update Fail",
        description: "Name update failed",
        status: "destructive",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    if (user) {
      setName(user.name);
    }
    navigate("/profile");
  }, [user]);
  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={logo}></img>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-[80vh] items-center justify-center">
        {update === 0 ? (
          <>
            {" "}
            <Card className="w-full max-w-md">
              <CardHeader className="flex flex-col items-center">
                <Avatar className="w-32 h-32 mb-4">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="Profil Resmi"
                  />
                </Avatar>
                <CardTitle className="text-2xl font-bold">
                  {user.name}
                </CardTitle>
                <Badge>{user.role}</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-center">
                  <Button onClick={() => setUpdate(1)}>Update</Button>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <Card>
              <CardHeader className="flex flex-col items-center">
                <Avatar className="w-32 h-32 mb-4">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="Profil Resmi"
                  />
                </Avatar>
              </CardHeader>
              <CardContent>
                <div className="">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex flex-row gap-6">
                  <Button onClick={() => setUpdate(0)}>Back</Button>
                  <Button onClick={() => handleUpdate(name)}>Update</Button>
                </div>
              </CardFooter>
            </Card>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
