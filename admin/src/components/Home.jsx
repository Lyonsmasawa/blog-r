import { useEffect, useState } from "react";
import { deletePosts, getPosts } from "../api/post";
import PostCard from "./PostCard";
import { useSearch } from "../context/SearchProvider";

let pageNo = 0;
const PAGE_LIMIT = 9;

const getPaginationCount = (length) => {
  const division = length / PAGE_LIMIT;
  if (division % 1 !== 0) {
    return Math.floor(division) + 1;
  }
  return division;
};

const Home = () => {
  const { searchResult } = useSearch();
  const [posts, setPosts] = useState();
  const [totalPostCount, setTotalPostCount] = useState();

  const paginationCount = getPaginationCount(totalPostCount) || 0;

  const paginationArr = new Array(paginationCount)?.fill(" ");

  const fetchPosts = async () => {
    const { error, posts, postCount } = await getPosts(pageNo, PAGE_LIMIT);

    if (error) return console.log(error);

    setPosts(posts);
    setTotalPostCount(postCount);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchMorePosts = (index) => {
    pageNo = index;
    fetchPosts();
  };

  const handleDelete = async ({ post: { id } }) => {
    const confirmed = window.confirm("Are you sure?");
    if (!confirmed) return;

    const { error, message } = await deletePosts(id);
    if (error) return console.log(error);
    console.log(message);

    const newPosts = posts.filter((p) => p.post.id !== id);
    setPosts(newPosts);
  };

  return (
    <div className="">
      {console.log(searchResult)}
      <div className="grid grid-cols-3 gap-3 pb-5">
        {searchResult?.length
          ? searchResult?.map((post) => {
              return (
                <PostCard
                  key={post?.post?.id}
                  post={post}
                  onDeleteClick={() => handleDelete(post)}
                />
              );
            })
          : posts?.map((post) => {
              return (
                <PostCard
                  key={post?.post?.id}
                  post={post}
                  onDeleteClick={() => handleDelete(post)}
                />
              );
            })}
      </div>
      {paginationArr?.length > 1 && !searchResult?.length && (
        <div className="py-5 flex justify-center items-center space-x-3">
          {paginationArr?.map((_, index) => {
            return (
              <button
                onClick={() => fetchMorePosts(index)}
                className={
                  index == pageNo
                    ? "text-blue-500 border-b-2 border-b-blue-500"
                    : "text-gray-500"
                }
                key={index}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
