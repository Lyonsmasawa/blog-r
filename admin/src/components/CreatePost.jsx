import { useState } from "react";
import {
  ImSpinner11,
  ImEye,
  ImFilePicture,
  ImFilesEmpty,
} from "react-icons/im";
import { uploadImage } from "../api/post";
import { useNotification } from "../context/NoificationProvider";

const mdRules = [
  { title: "From h1 to h6", rule: "# Heading -> ###### Heading" },
  { title: "Blockquote", rule: "> Your Quote" },
  { title: "Image", rule: "![image alt](http://image_url.com)" },
  { title: "Link", rule: "[Link Text](http://your_link.com)" },
];

const defaultPost = {
  title: "",
  thumbnail: "",
  featured: false,
  tags: "",
  meta: "",
  content: "",
};

const CreatePost = () => {
  const [postInfo, setPostInfo] = useState({ ...defaultPost });
  const { title, featured, tags, meta, content } = postInfo;
  const [imageUrlToCopy, setImageUrlToCopy] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  const {updateNotification} = useNotification()

  const handleChange = ({ target }) => {
    const { value, name, checked } = target;

    if (name === "thumbnail") {
      const file = target.files[0];
      if (!file.type.includes("image")) {
        return alert("this is not an image!");
      }
      setPostInfo({ ...postInfo, thumbnail: value });
      return setSelectedImageUrl(URL.createObjectURL(file));
    }
    if (name === "featured") {
      return setPostInfo({ ...postInfo, [name]: checked });
    }

    if (name === "tags") {
      const newTags = tags.split(", ");
      if (newTags.length > 4) console.log("only 4 will be selected");
    }

    if (name === "meta" && meta.length >= 150) {
      return setPostInfo({ ...postInfo, meta: meta.substring(0, 150) });
    }

    setPostInfo({ ...postInfo, [name]: value });
  };

  const handleImageUpload = async ({ target }) => {
    if (imageUploading) return;

    const file = target.files[0];
    if (!file.type.includes("image")) {
      return updateNotification("error", "this is not an image!");
    }
    setImageUploading(true);

    const formData = new FormData();
    formData.append("image", file);
    const { error, image } = await uploadImage(formData);
    setImageUploading(false);
    if (error) return console.log(error);
    setImageUrlToCopy(image);
  };

  const handleOnCopy = () => {
    const textToCopy = `![Add image description](${imageUrlToCopy})`;
    navigator.clipboard.writeText(textToCopy);
  };

  return (
    <form className="p-2 flex">
      <div className="w-9/12 h-screen space-y-3 p-2 flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-700">
            Create new post
          </h1>

          <div className="flex items-center space-x-5">
            <button
              type="button"
              className="flex items-center space-x-2 px-3 ring-1 text-blue-500 hover:text-white hover:bg-blue-500 transition ring-blue-500 rounded h-10 "
            >
              <ImSpinner11 />
              <span>Reset</span>
            </button>
            <button
              type="button"
              className="flex items-center space-x-2 px-3 ring-1 text-blue-500 hover:text-white hover:bg-blue-500 transition ring-blue-500 rounded h-10 "
            >
              <ImEye />
              <span>View</span>
            </button>
            <button
              type="button"
              className="px-5 hover:ring-1 bg-blue-500 text-white hover:text-blue-500 hover:bg-transparent transition hover:ring-blue-500 rounded h-10 w-36"
            >
              Post
            </button>
          </div>
        </div>
        <div className="flex">
          <input
            id="featured"
            name="featured"
            onChange={handleChange}
            type="checkbox"
            hidden
          />
          <label
            htmlFor="featured"
            className="select-none flex items-center cursor-pointer group space-x-2 text-gray-700"
          >
            <div className="w-4 h-4 rounded-full border-2 border-gray-500 flex items-center justify-center group-hover:border-blue-500">
              {featured && (
                <div className="w-2 h-2 rounded-full bg-gray-500  group-hover:bg-blue-500"></div>
              )}
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
              onChange={handleImageUpload}
              hidden
              id="image-input"
              disabled={imageUploading}
            />
            <label
              htmlFor="image-input"
              className="flex items-center cursor-pointer space-x-2 px-3 ring-1 text-gray-700 hover:text-white hover:bg-gray-700 transition ring-gray-700 rounded h-10 "
            >
              <span>Place Image</span>
              {!imageUploading ? (
                <ImFilePicture />
              ) : (
                <ImSpinner11 className="animate-spin" />
              )}
            </label>
          </div>
          {imageUrlToCopy && (
            <div className="flex flex-1 bg-gray-400 justify-between rounded overflow-hidden">
              <input
                type="text"
                className="bg-transparent px-2 text-white w-full"
                disabled
                value={imageUrlToCopy}
              />
              <button
                onClick={handleOnCopy}
                type="button"
                className="text-xs flex justify-center flex-col items-center self-stretch p-1 bg-gray-700 text-white"
              >
                <ImFilesEmpty />
                <span>copy</span>
              </button>
            </div>
          )}
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
          <label htmlFor="meta">Meta description {meta?.length} / 150</label>
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
            <input
              type="file"
              hidden
              id="thumbnail"
              name="thumbnail"
              onChange={handleChange}
            />
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
