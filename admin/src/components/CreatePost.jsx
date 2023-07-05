import {ImSpinner11, ImEye } from 'react-icons/im'

const CreatePost = () => {
  return (
    <form action="">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-700">Create new post</h1>

        <div className="flex items-center space-x-5">
          <button>
            <ImSpinner11 className="flex items-center space-x-2 px-3 ring-1 text-blue-500 hover:text-white hover:bg-blue-500 transition ring-blue-500 rounded h-10 " />
            <span>Reset</span>
          </button>
          <button>
            <ImEye className="flex items-center space-x-2 px-3 ring-1 text-blue-500 hover:text-white hover:bg-blue-500 transition ring-blue-500 rounded h-10 " />
            <span>Reset</span>
          </button>
          <button className="px-5 hover:ring-1 bg-blue-500 text-white hover:text-blue-500 hover:bg-transparent transition hover:ring-blue-500 rounded h-10 w-36" >Post</button>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
