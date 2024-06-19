import Layout from "@/components/layout";
import { useUserAuth } from "@/context/userauthContext";
import { DocumentResponse, ProfileResponse, post } from "@/types";
import * as React from "react";
import avatar from "@/assets/images/avatar.png";
import { Button } from "@/components/ui/button";
import { Edit2Icon, HeartIcon } from "lucide-react";
import { getPostByUserId } from "@/repository/post.service";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "@/repository/user.service";

interface IProfileProps {}

const Profile: React.FunctionComponent<IProfileProps> = () => {
  const { user } = useUserAuth();
  const navigate=useNavigate();
  const initialUserInfo: ProfileResponse = {
    id: "",
    userId: user?.uid,
    userBio: "Please update your bio..",
    photoURL: user?.photoURL ? user.photoURL : "",
    displayName: user?.displayName ? user.displayName : "Guest_User",
  };

  const [userInfo, setUserInfo] =
    React.useState<ProfileResponse>(initialUserInfo);

  const [data, setData] = React.useState<DocumentResponse[]>([]);

  const getAllPost = async (id: string) => {
    try {
      const querySnapShot = await getPostByUserId(id);
      const tempArr: DocumentResponse[] = [];
      if (querySnapShot.size > 0) {
        querySnapShot.forEach((doc) => {
          const data = doc.data() as post;
          const responseObj: DocumentResponse = {
            id: doc.id,
            ...data,
          };
          console.log("The response object is : ", responseObj);
          tempArr.push(responseObj);
        });
        setData(tempArr);
      } else {
        console.log("No such document");
      }
    } catch (error) {
      console.log(error);
    }
  };



  const renderPost = () => {
    return data.map((item) => {
      if (!item.photos || item.photos.length === 0) {
        return null;
      }
      return (
        <div key={item.photos[0].uuid} className="relative">
          <div className="absolute group transition-all duration-200 bg-transparent hover:bg-slate-950 hover:bg-opacity-75 top-0 bottom-0 left-0 right-0 w-full h-full">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <HeartIcon className="hidden group-hover:block fill-white" />
              <div className="hidden group-hover:block text-white">
                {item.likes} likes
              </div>
            </div>
          </div>
          <img
            src={`${item.photos[0].cdnUrl}/-/progressive/yes/-/scale_crop/300x300/center/`}
          />
        </div>
      );
    });
  };

  
  const getUserProfileInfo=async(userId:string)=>{
    console.log(userId);
    const data:ProfileResponse = await getUserProfile(userId)||{};
    console.log("data",data);
    if(data.displayName){
      setUserInfo(data);
    }
  }



  const editProfile=()=>{
    navigate("/editProfile",{state:userInfo});
  }

  React.useEffect(() => {
    if (user != null) {
      getAllPost(user.uid);
      getUserProfileInfo(user.uid);
    }
  }, []);

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="border max-w-3xl w-full ">
          <h3 className="bg-slate-800 text-white text-center text-lg p-2">
            Profile
          </h3>
          <div className="p-8 pb-4 border-b">
            <div className="flex items-center flex-row pb-2 mb-2">
              <div className="mr-2 ">
                <img
                  src={userInfo?.photoURL ? userInfo.photoURL : avatar}
                  alt="avavtar"
                  className="w-28 h-28 rounded-full border-2 border-slate-800 object-cover"
                />
              </div>
             <div>
             <div className="text-xl ml-3">{userInfo.displayName}</div>
              <div className="text-l ml-3">
                {user?.email ? user.email : ""}
              </div>
             </div>
            </div>
            <div className="mb-4 ">{userInfo.userBio}</div>
          <div>
            <Button onClick={editProfile}>
              <Edit2Icon className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
          </div>
          <div className="p-8">
            <h2 className="mb-5">My Posts</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {data ? renderPost() : <div>...Loading</div>}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
