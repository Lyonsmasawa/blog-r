import jim from "../assets/office_jim_70.png";
import PropTypes from "prop-types";
import dateFormat from "dateformat";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";

const PostCard = ({ post, onDeleteClick }) => {
  if (!post) return null;
  const {
    post: { title, thumbnail, tags, meta, createdAt, slug },
  } = post;

  return (
    <div className="bg-white shadow-sm rounded flex flex-col">
      <img className="aspect-video" src={thumbnail || jim} alt={title} />
      <div className="p-2 flex-1 flex-col">
        <h1 className="text-lg font-semibold text-gray-700">{title}</h1>
        <p className="text-gray-500">{meta?.substring(0, 80) + "..."}</p>
        <div className="flex justify-between py-2">
          <p className="text-gray-500 text-sm">
            {dateFormat(createdAt, "mediumDate")}
          </p>
          <p className="text-gray-500 text-sm">{tags?.join(", ")}</p>
        </div>

        <div className="flex space-x-3">
          <Link
            to={`/update-post/${slug}`}
            className="w-8 h-8 rounded-full bg-blue-400 hover:bg-blue-600 justify-center items-center text-white"
          >
            <BsPencilSquare />
          </Link>
          <button
            onClick={() => onDeleteClick(post)}
            className="w-8 h-8 rounded-full bg-red-400 hover:bg-red-600 justify-center items-center text-white"
          >
            <BsTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    post: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      meta: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      thumbnail: PropTypes.string,
    }),
  }),
};

export default PostCard;
