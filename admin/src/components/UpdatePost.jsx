import { useNavigate, useParams } from "react-router-dom";
import PostForm from "./PostForm";
import { useEffect, useState } from "react";
import { getPost, updatePost } from "../api/post";
import { useNotification } from "../context/NoificationProvider";
import NotFound from "./NotFound";

const UpdatePost = () => {
  const { updateNotification } = useNotification();
  const { slug } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, post } = await updatePost(postInfo.id, data);
    setBusy(false);
    if (error) return updateNotification("error", error);

    setPostInfo({ ...post, tags: post.tags?.join(", ") });
  };

  const fetchPost = async () => {
    const { error, post } = await getPost(slug);
    if (error) {
      setNotFound(true);
      return updateNotification("error", error);
    }
    console.log(post);
    setPostInfo({ ...post, tags: post.tags?.join(", ") });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (notFound) return <NotFound />;

  return (
    <div>
      <PostForm
        onSubmit={handleSubmit}
        initialPost={postInfo}
        postBtnTitle="Update"
        busy={busy}
        resetAfterSubmit
      />
    </div>
  );
};

export default UpdatePost;
