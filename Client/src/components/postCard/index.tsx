import { useUserAuth } from "@/context/userauthContext";
import { DocumentResponse } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { HeartIcon, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { updateLikesonPost } from "@/repository/post.service";

interface IPostCardProps {
  data: DocumentResponse;
}

const PostCard: React.FunctionComponent<IPostCardProps> = ({ data }) => {
  const { user } = useUserAuth();
  const [likesInfo, setlikesInfo] = React.useState<{
    likes: number;
    isLike: boolean;
  }>({
    likes: data.likes!,
    isLike: data.userlikes?.includes(user!?.uid) ? true : false,
  });

  const updateLike = async (isVal: boolean) => {
    try {
      const newLikesCount = isVal ? likesInfo.likes + 1 : likesInfo.likes - 1;
      const updatedUserLikes = isVal
        ? [...data.userlikes!, user!.uid]
        : data.userlikes!.filter(uid => uid !== user!.uid);

      setlikesInfo({
        likes: newLikesCount,
        isLike: !likesInfo.isLike,
      });

      console.log(`Updating likes: ${newLikesCount}, UserLikes: ${updatedUserLikes}`);

      await updateLikesonPost(data.id!, updatedUserLikes, newLikesCount);
    } catch (error) {
      console.error("Failed to update likes:", error);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-col p-3">
        <CardTitle className="text-sm text-center flex justify-start items-center">
          <span className="mr-2">
            <img
              src={data.photoURL!}
              alt=""
              className="w-10 h-10 rounded-full border-2 border-slate-800 object-cover"
            />
          </span>
          <span>{data.username}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <img src={data.photos ? data.photos[0].cdnUrl : ""} alt="" />
      </CardContent>
      <CardFooter className="flex flex-col p-3">
        <div className="flex justify-between w-full mb-3">
          <HeartIcon
            className={cn(
              "mr-3",
              "cursor-pointer",
              likesInfo.isLike ? "fill-red-500" : "fill-none"
            )}
            onClick={() => updateLike(!likesInfo.isLike)}
          />
          <MessageCircle className="mr-3" />
        </div>
        <div className="w-full text-sm">{likesInfo.likes} likes</div>
        <div className="w-full text-sm">
          <span>{data.username}</span>: {data.caption}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
