import { useState } from "react";
import {
  ImSpinner11,
  ImEye,
  ImFilePicture,
  ImFilesEmpty,
} from "react-icons/im";

const mdRules = [
  { title: "From h1 to h6", rule: "# Heading -> ###### Heading" },
  { title: "Blockquote", rule: "> Your Quote" },
  { title: "Image", rule: "![image alt](http://image_url.com)" },
  { title: "Link", rule: "[Link Text](http://your_link.com)" },
];

const defaultPost = {
  title: "",
  thumbnail: "",
  featured: "",
  tags: "",
  meta: "",
  content: "",
};

const CreatePost = () => {
  const [postInfo, setPostInfo] = useState({ ...defaultPost });
  const { title, featured, tags, meta, content } = postInfo;

  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  const handleChange = ({ target }) => {
    const { value, name } = target;

    if (name === "thumbnail") {
      const file = target.files[0];
      if (!file.type.includes("image")) {
        return alert("this is not an image!");
      }
      setPostInfo({ ...postInfo, thumbnail: value });
      return setSelectedImageUrl(URL.createObjectURL(file));
    }

    setPostInfo({ ...postInfo, [name]: value });
  };

  return (
    <form className="p-2 flex">
      <div className="w-9/12 h-screen space-y-3 p-2 flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-700">
            Create new post
          </h1>

          <div className="flex items-center space-x-5">
            <button className="flex items-center space-x-2 px-3 ring-1 text-blue-500 hover:text-white hover:bg-blue-500 transition ring-blue-500 rounded h-10 ">
              <ImSpinner11 />
              <span>Reset</span>
            </button>
            <button className="flex items-center space-x-2 px-3 ring-1 text-blue-500 hover:text-white hover:bg-blue-500 transition ring-blue-500 rounded h-10 ">
              <ImEye />
              <span>View</span>
            </button>
            <button className="px-5 hover:ring-1 bg-blue-500 text-white hover:text-blue-500 hover:bg-transparent transition hover:ring-blue-500 rounded h-10 w-36">
              Post
            </button>
          </div>
        </div>
        <div className="">
          <input id="featured" type="checkbox" hidden />
          <label
            htmlFor="featured"
            className="flex items-center cursor-pointer group space-x-2 text-gray-700"
          >
            <div className="w-4 h-4 rounded-full border-2 border-gray-500 flex items-center justify-center group-hover:border-blue-500">
              <div className="w-2 h-2 rounded-full bg-gray-500  group-hover:bg-blue-500"></div>
            </div>
            <span className="group-hover:text-blue-500">Featured</span>
          </label>
        </div>

        {/* title input */}
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={title}
          className="text-xl outline-none focus:ring-1 rounded p-2 w-full font-semibold"
          placeholder="Post title"
        />

        {/* image input */}
        <div className="flex space-x-2">
          <div className="">
            <input
              type="file"
              name="thumbnail"
              onChange={handleChange}
              hidden
              id="image-input"
            />
            <label
              htmlFor="image-input"
              className="flex items-center cursor-pointer space-x-2 px-3 ring-1 text-gray-700 hover:text-white hover:bg-gray-700 transition ring-gray-700 rounded h-10 "
            >
              <span>Place Image</span>
              <ImFilePicture />
            </label>
          </div>
          <div className="flex flex-1 bg-gray-400 justify-between rounded overflow-hidden">
            <input
              type="text"
              className="bg-transparent px-2 text-white w-full"
              disabled
              value="https://res.cloudinary.com/xlyons/image/upload/v1688591343/fnr7usbsna9yt9ri6ler.jpg"
            />
            <button className="text-xs flex justify-center flex-col items-center self-stretch p-1 bg-gray-700 text-white">
              <ImFilesEmpty />
              <span>copy</span>
            </button>
          </div>
        </div>

        <textarea
          name="content"
          onChange={handleChange}
          value={content}
          className="resize-none font-mono tracking-wide text-lg  outline-none focus:ring-1 rounded p-2 w-full flex-1"
          placeholder="## Markdown"
        ></textarea>

        {/* tags input */}
        <div className="">
          <label htmlFor="tags">Tags</label>
          <input
            id="tags"
            name="tags"
            onChange={handleChange}
            value={tags}
            type="text"
            className="outline-none focus:ring-1 rounded p-2 w-full"
            placeholder="Tag one, Tag two, tag three ..."
          />
        </div>

        {/* meta description input */}
        <div className="">
          <label htmlFor="meta">Meta description</label>
          <input
            name="meta"
            onChange={handleChange}
            value={meta}
            id="meta"
            type="text"
            className="outline-none focus:ring-1 rounded p-2 w-full h-28"
            placeholder="Meta description"
          />
        </div>
      </div>
      <div className="w-1/4 px-2 relative">
        <h1 className="text-xl font-semibold text-gray-700 mb-2">Thumbnail</h1>
        {selectedImageUrl ? (
          <img
            src={selectedImageUrl}
            className="shadow-sm aspect-video rounded"
            alt=""
          />
        ) : (
          <div className="">
            <input type="file" hidden id="thumbnail" />
            <label htmlFor="thumbnail" className="cursor-pointer">
              <div className="border border-dashed border-gray-500 aspect-video text-gray-500 flex flex-col justify-center items-center">
                <span>Select thumbnail</span>
                <span className="text-xs">recommended size</span>
                <span className="text-xs">1280x720</span>
              </div>
            </label>
          </div>
        )}
        <div className="bg-white absolute top-1/2 -translate-y-1/2 px-2 py-4 rounded ">
          <h1 className="font-semibold text-center ">General markdown rules</h1>
          <ul className="space-y-2">
            {mdRules?.map(({ title, rule }) => {
              return (
                <li key={title}>
                  <p className="font-semibold text-gray-500">{title}</p>
                  <p className="font-semibold text-gray-700 pl-2 font-mono">
                    {rule}
                  </p>
                </li>
              );
            })}
            <li className="text-center text-blue-500">
              <a
                href="https://www.markdownguide.org/basic-syntax/"
                target="_blank"
                rel="noreferrer"
              >
                Find out more
              </a>
            </li>
          </ul>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
