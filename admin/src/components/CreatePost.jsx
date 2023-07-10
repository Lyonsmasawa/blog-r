import { useNavigate } from "react-router-dom";
import { createPost } from "../api/post";
import { useNotification } from "../context/NoificationProvider";
import PostForm, { defaultPost } from "./PostForm";
import { useEffect, useState } from "react";

const CreatePost = () => {
  const { updateNotification } = useNotification();
  const [busy, setBusy] = useState(false);
  const [clear, setClear] = useState(false);
  const navigate = useNavigate();
  const [postInfo, setPostInfo] = useState(null);

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, post } = await createPost(data);
    setBusy(false);
    if (error) return updateNotification("error", error);
    setClear(true);
    navigate(`/update-post/${post.slug}`);
  };

  useEffect(() => {
    const result = localStorage.getItem("blogPost");
    if (!result) return;

    const oldPost = JSON.parse(result);
    setPostInfo({ ...defaultPost, ...oldPost });
  }, []);
  return (
    <div>
      <PostForm
        onSubmit={handleSubmit}
        initialPost={postInfo}
        postBtnTitle="Post"
        busy={busy}
        resetAfterSubmit={clear}
      />
    </div>
  );
};

export default CreatePost;
