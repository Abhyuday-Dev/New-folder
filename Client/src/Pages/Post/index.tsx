import FileUploader from "@/components/fileUploader";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUserAuth } from "@/context/userauthContext";
import { createPost } from "@/repository/post.service";
import { FileEntry, PhotoMeta, post } from "@/types";
import * as React from "react";
import { useNavigate } from "react-router-dom";

interface IPostProps {}

const Post: React.FunctionComponent<IPostProps> = (props) => {
  const { user } = useUserAuth();
  const [fileEntry, setFileEntry] = React.useState<FileEntry>({
    files: [],
  });

  const navigate=useNavigate();

  const [npost, setPost] = React.useState<post>({
    caption: "",
    photos: [],
    likes: 0,
    userlikes: [],
    userId: null,
    date: new Date(),
  });

  const handleSubmit=async(e:React.MouseEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log("uploaded file entry: ",fileEntry.files);
    console.log("created post: ",npost);

    const photoMeta:PhotoMeta[]=fileEntry.files.map((file)=>{
      return {cdnUrl:file.cdnUrl,uuid:file.uuid};
    });

    if(user!==null){
      const newPost:post={
        ...npost,
        userId: user?.uid || null,
        photos: photoMeta,
      }
      console.log(newPost);
      await createPost(newPost);
      navigate("/")
    }else{
      navigate("/login");
    }
  }


  return (
    <Layout>
      <div className="flex justify-center">
        <div className="max-w-3xl border w-full">
          <h3 className="bg-slate-800 text-white text-center text-lg p-2">
            Create Post
          </h3>
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <Label className="mb-4" htmlFor="caption">
                  Photo Caption
                </Label>
                <Textarea
                  className="mb-8"
                  id="caption"
                  placeholder="What's in your photo?"
                  value={npost.caption}
                  onChange={(e) => {
                    setPost({ ...npost, caption: e.target.value });
                  }}
                ></Textarea>
              </div>
              <div className="flex flex-col">
                <Label className="mb-4" htmlFor="Photo">
                  Photos
                </Label>
              </div>
              <FileUploader fileEntry={fileEntry} onChange={setFileEntry} />
              <Button className="mt-8 w-36" type="submit">
                Post
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Post;
