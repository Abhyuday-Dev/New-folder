import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import * as React from "react";

interface IPostProps {}

const Post: React.FunctionComponent<IPostProps> = (props) => {
  return (
    <Layout>
      <div className="flex justify-center">
        <div className="max-w-3xl border w-full">
          <h3 className="bg-slate-800 text-white text-center text-lg p-2">Create Post</h3>
          <div className="p-8">
            <form>
              <div className="flex flex-col">
                <Label className="mb-4" htmlFor="caption">Photo Caption</Label>
                <Textarea className="mb-8" id="caption" placeholder="What's in your photo?"></Textarea>
              </div>
              <div className="flex flex-col">
                <Label className="mb-4" htmlFor="Photo">Photos</Label>
              </div>
              <Button className="mt-8 w-36" type="submit">Post</Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Post;
