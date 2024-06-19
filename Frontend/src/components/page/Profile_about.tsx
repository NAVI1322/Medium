
import { useRecoilValue } from "recoil";
import { TextareaForm } from "../Blog_ui/TextArea";
import Pro_NavBar from "../NavBar/profile_Nav";
import LeftProfile from "../Profile/Left_profile";
import { ProfileData } from "@/atom/GlobalState";





const AboutProfile = () => {


    const {firstName} = useRecoilValue(ProfileData)
    return ( 
    <div className="container flex md:flex-row flex-col mx-auto w-[80%] mt-16">
        <div className="flex md:flex-col border-r w-[60%] p-5">
            <div className="flex justify-between text-start  items-center ">
                <div className="text-5xl ">
                   {firstName}
                </div>
            </div>
            <div className="mt-12"><Pro_NavBar/></div>
            <div className="mt-12">
            <TextareaForm />
            </div>
        </div>
      <LeftProfile />


    </div> );
}
 
export default AboutProfile;