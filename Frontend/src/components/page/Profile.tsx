
import { useRecoilValue } from "recoil";
import Pro_NavBar from "../NavBar/profile_Nav";
import LeftProfile from "../Profile/Left_profile";
import { Button } from "../ui/button";
import { ProfileData } from "@/atom/GlobalState";





const ProfilePage = () => {

    const {firstName} = useRecoilValue(ProfileData)
    
    return ( 
    <div className="container flex md:flex-row flex-col mx-auto w-[80%] mt-16">
        <div className="flex md:flex-col border-r  w-[60%] p-5">
            <div className="flex justify-between text-start  items-center ">
                <div className="text-5xl ">
                {firstName}
                </div>
                <div className="p-2">
                    ... 
                </div>
            </div>
            <div className="mt-12"><Pro_NavBar/></div>
            <div>
                <div className="space-x-5 flex mt-8">
                    <Button variant={"destructive"}>Liked Post</Button>
                    <Button variant={"ghost"}>Saved Post</Button>
                </div>
                <div className="grid grid-cols-3">
                        
                    
                </div>
            </div>
        </div>
      <LeftProfile />


    </div> );
}
 
export default ProfilePage;