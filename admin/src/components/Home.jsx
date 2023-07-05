import { useEffect, useState } from "react";
import { getPosts } from "../api/post";
import PostCard from "./PostCard";

let pageNo = 1;
const PAGE_LIMIT = 9;

const getPaginationCount = (length) => {
  const division = length / PAGE_LIMIT;
  if (division % 1 !== 0) {
    return Math.floor(division) + 1;
  }
  return division;
};

const Home = () => {
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

  return (
    <div className="">
      <div className="grid grid-cols-3 gap-3">
        {posts?.map((post) => {
          return <PostCard key={post?.post?.id} post={post} />;
        })}
      </div>
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
    </div>
  );
};

export default Home;
