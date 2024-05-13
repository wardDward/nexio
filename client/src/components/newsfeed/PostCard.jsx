import InteractionBar from "./InteractionBar";

export default function PostCard() {
  return (
    <div className="my-2 bg-white flex  flex-col w-full pt-6 shadow-md rounded-lg border ">
      <div className="flex items-center px-4">
        <img
          src="https://images.unsplash.com/photo-1642649149963-0ef6779df6c6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="h-[40px] w-[40px] rounded-full border border-gray-200"
        />
        <a href="#" className="text-black font-semibold text-sm ml-3">
          Edward Taligatos
        </a>
      </div>
      <div className="my-2">
        <p className="text-[13px] text-gray-600 font-[400] line-clamp-2 px-5">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate,
          dicta aliquid repellat fuga reiciendis suscipit facilis inventore
          dolore magnam eius illum porro quod, eum nisi facere veniam ut velit
          vitae!
        </p>
      </div>
      <div className="flex justify-center mt-4 px-5">
        <img
          src="https://images.unsplash.com/photo-1714385998351-341d070aa79e?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="object-cover h-[500px]"
          alt=""
        />
      </div>
      <InteractionBar />
    </div>
  );
}
