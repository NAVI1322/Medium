import { ProfileData } from "@/atom/GlobalState";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { capitalizeFirstLetter } from "../Config/FirstLetterCapital";

export function AboutModal() {
  interface UserData {
    firstName: string;
    lastName: string;
    email: string;
  }

  const id = "c4ea7b6f-2310-440f-a9de-a83269019a68";
  const Domain = import.meta.env.VITE_DOMAIN;
  const [data, setData] = useRecoilState<UserData>(ProfileData);
  const [FName, setFName] = useState(data.firstName);
  const [LName, setLName] = useState(data.lastName);
  const [Email,SetEmail] = useState(data.email);

  async function handleSavingProfile() {
    try {
      const res = await axios.put(`${Domain}/api/v1/blog/${id}`, {
        firstName: FName,
        lastName: LName,
      });

      setData((prevData) => ({
        ...prevData,
        firstName: capitalizeFirstLetter(res.data.user.firstName),
        lastName: capitalizeFirstLetter(res.data.user.lastName),
      }));
      alert("Profile updated successfully!"); // Success alert
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile."); // Error alert
    }
  }

  useEffect(() => {
    setFName(data.firstName);
    setLName(data.lastName);
    SetEmail(data.email)
  }, [data]);

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="firstName" className="text-right">
            First Name
          </Label>
          <Input
            id="firstName"
            className="col-span-3"
            value={FName}
            onChange={(e) => setFName(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="lastName" className="text-right">
            Last Name
          </Label>
          <Input
            id="lastName"
            className="col-span-3"
            value={LName}
            onChange={(e) => setLName(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input id="email" value={Email} className="col-span-3" readOnly />
        </div>
      </div>
      <DialogFooter>
        <Button type="button" onClick={handleSavingProfile}>
          Save changes
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}