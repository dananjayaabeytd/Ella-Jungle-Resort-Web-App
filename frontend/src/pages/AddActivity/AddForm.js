
import React ,{useState} from "react";
import axios from "axios";

 //this will load the components related only for a specific page
 import {useNavigate} from "react-router-dom"; 

export default function AddForm(){


    const [name,setName]= useState("");
   //const [image,setImage]= useState("");
    const[description,setDescription] = useState("");
    const [price,setPrice] = useState("");
    const navigate=useNavigate();


    function sendData(e) {
        e.preventDefault();
        const newSpecialActivity = {
            name,
            //image,
            description,
            price
        };
        axios.post("http://localhost:8080/SpecialActivity/add", newSpecialActivity)
            .then(() => {
                alert("Special Activity Added");
                navigate("/");
            })
            .catch((err) => {
                alert(err);
            });
    }
    
    

    




    return (
        <div className="flex items-center justify-center min-h-screen">

            <div className="bg-green-600 bg-opacity-50 flex items-center justify-center w-full max-w-[600px] rounded-xl py-14 px-11 text-xl font-extrabold text-black">

                <form className="flex flex-col w-full" onSubmit={sendData}>

                    <h2 className="self-center text-3xl text-white mb-8">Add a Special Activity</h2>


                    <label htmlFor="name" className="mt-4">Name</label>
                    <input type="text" id="name" className="mt-2 rounded-3xl bg-zinc-300 h-[47px] font-normal px-5 py-1" value={name} onChange={(e) => setName(e.target.value)} />


                  


                    <label htmlFor="description" className="mt-8">Description</label>
                    <textarea id="description" className="mt-3 max-w-full h-20 rounded-3xl bg-zinc-300 w-[509px] font-normal px-5 py-1 text-sm" value={description} onChange={(e) => setDescription(e.target.value)} />



                    <label htmlFor="price" className="mt-8">Price Per Person (Rs.)</label>
                    <input type="number" id="price" className="mt-2 rounded-3xl bg-zinc-300 h-[50px] font-normal px-5 py-1" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />



                    <button type="submit" className="justify-center self-center px-8 py-3 mt-14 whitespace-nowrap bg-green-800 rounded-[60px] hover:bg-green-600">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}