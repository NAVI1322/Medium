import { atom } from "recoil";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
   // Adjust the type of comments based on your data structure
}

export const ProfileData = atom<UserData>({
  key: 'ProfileData', // unique ID (with respect to other atoms/selectors)
  default: {
    firstName: "",
    lastName: "",
    email: "",
  }, 
});