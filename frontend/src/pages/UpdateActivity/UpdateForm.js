import * as React from "react";

function UpdateForm() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-cover">
      <div className="bg-green-600  flex items-center justify-center w-full max-w-[600px] rounded-[60px] py-14 px-11 text-xl font-extrabold text-black">
        <form className="flex flex-col w-full">
          <h2 className="self-center text-3xl text-white mb-8">Update</h2>

         
          <label htmlFor="name" className="mt-4">Name</label>
          <input type="text" id="name" className="mt-2 rounded-3xl bg-zinc-300 h-[50px] font-normal pl-2" value="Name1"  />

          <label htmlFor="image" className="mt-8">Image</label>
          <div className="flex items-center justify-center px-16 py-10 mt-3 max-w-full text-3xl whitespace-nowrap rounded-3xl bg-zinc-300 w-[350px] font-normal">
            Image1
          </div>

          <label htmlFor="description" className="mt-8 ">Description</label>
          <textarea id="description" className="mt-3 max-w-full h-20 rounded-3xl bg-zinc-300 w-[509px] font-normal pl-3 " value="Description1">Description1</textarea>

          <label htmlFor="price" className="mt-8">Price</label>
          <input type="text" id="price" className="mt-2 rounded-3xl bg-zinc-300 h-[50px] font-normal pl-2" value="Price1" />

          <button type="submit" className="justify-center self-center px-8 py-3 mt-14 whitespace-nowrap bg-green-800 rounded-[60px]">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateForm;