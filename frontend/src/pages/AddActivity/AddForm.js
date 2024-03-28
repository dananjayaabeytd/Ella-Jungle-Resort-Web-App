import React from "react";


export default function AddForm(){


    return(

        <div className="flex items-center justify-center min-h-screen " >

        <div className="bg-green-600 bg-opacity-50 flex items-center justify-center w-full max-w-[600px] rounded-[60px] py-14 px-11 text-xl font-extrabold text-black">


            <form className="flex flex-col w-full">


                <h2 className="self-center text-3xl text-white mb-8">Add a Special Activity</h2>

                <label for="name" className="mt-4">Name</label>
                <input type="text" id="name" className="mt-2 rounded-3xl bg-zinc-300 h-[47px]" />


                <label for="image" className="mt-8">Image</label>
                <div className="flex items-center justify-center px-16 py-10 mt-3 max-w-full text-8xl whitespace-nowrap rounded-3xl bg-zinc-300 w-[350px]">
                    +
                </div>


                <label for="description" className="mt-8">Description</label>
                <textarea id="description" className="mt-3 max-w-full h-20 rounded-3xl bg-zinc-300 w-[509px]" />


                <label for="price" className="mt-8">Price</label>
                <input type="number" id="price" className="mt-2 rounded-3xl bg-zinc-300 h-[50px]" />


                <button type="submit" className="justify-center self-center px-8 py-3 mt-14 whitespace-nowrap bg-green-800 rounded-[60px]">
                    Submit
                </button>



            </form>
        </div>
    </div>

    );
}
