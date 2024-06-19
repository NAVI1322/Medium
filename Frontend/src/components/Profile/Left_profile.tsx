import { ProfileData } from "@/atom/GlobalState";
import axios from "axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { AboutModal } from "./Modal_EditProfile";
import { Button } from "../ui/button";
import { capitalizeFirstLetter } from "../Config/FirstLetterCapital";

const LeftProfile = () => {
  const [data, setData] = useRecoilState(ProfileData);

  const id = "c4ea7b6f-2310-440f-a9de-a83269019a68";
  const Domain = import.meta.env.VITE_DOMAIN; 

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${Domain}/api/v1/blog/GetProfileData/${id}`);
        

         setData(res.data.UserData); // Ensure res.data.UserData has correct structure
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [id, setData, Domain]); // Dependency array

  return (
    <div className="flex border-l w-[40%] p-4">
      <div className="space-y-5 font-medium">
        <div className="rounded-full">
          <img className="rounded-full w-20 h-20" src="https://picsum.photos/400/400" alt="Profile picture" />
        </div>
        <div className="">
          <span className="text-md">{capitalizeFirstLetter(data.firstName)} </span>
          <span className="text-md">{capitalizeFirstLetter(data.lastName)}</span>
        </div>
        <div>
          <span className="text-lg">{data.email}</span>
        </div>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"link"} className="hover:text-green-500  text-green-700">Edit Profile</Button>
            </DialogTrigger>
            <AboutModal />
          </Dialog>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
};

export default LeftProfile;