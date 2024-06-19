import { useUserAuth } from "@/context/userauthContext";
import { getAllUsers } from "@/repository/user.service";
import { ProfileResponse } from "@/types";
import * as React from "react";
import avatar from "@/assets/images/avatar.png";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

interface IUserListProps {}

const UserList: React.FunctionComponent<IUserListProps> = () => {
  const { user } = useUserAuth();
  const [suggestedUser, setSuggestedUser] = React.useState<ProfileResponse[]>(
    []
  );

  const getSuggestedUsers = async (userId: string) => {
    const response = (await getAllUsers(userId)) || [];
    if (response.length > 0) {
      setSuggestedUser(response);
    }
  };

  React.useEffect(() => {
    if (user != null) {
      getSuggestedUsers(user?.uid);
    }
  });

  const renderUsers = () => {
    return suggestedUser.map((user)=>{
      return (
        <div className="flex flex-row items-center mb-4 border-gray-400 justify-start">
          <span className="mr-2">
            <img src={user.photoURL?user.photoURL:avatar} alt="" className="w-10 h-10 rounded-full border-2 border-slate-800 object-cover" />
          </span>
          <span className="text-xs ">{user.displayName?user.displayName:"Guest"}</span>
          <Button className="text-xs p-3 py-2 h-6 bg-slate-900 last-of-type:ml-auto">Follow</Button>
        </div>
      )
    })
  }
  return (
    <div className="text-white py-8 px-3">
      <Link to="/profile">
      <div className="flex flex-row items-center border-b pb-4 mb-4 border-gray-400 cursor-pointer">
        <span className="mr-2">
          <img
            src={user?.photoURL ? user.photoURL : avatar}
            alt="my-image"
            className="w-10 h-10 rounded-full border-2 border-slate-800 object-cover"
          />
        </span>
        <span className="text-xs">{user?.displayName?user.displayName:"Guest_User"}</span>
      </div>
      </Link>
      <h3 className="text-sm text-slate-300">Suggested Friends</h3>
      <div className="my-4">{suggestedUser.length>0?renderUsers():<></>}</div>
    </div>
  );
};

export default UserList;
