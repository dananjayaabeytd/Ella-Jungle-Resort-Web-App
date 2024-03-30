
import  React,{useState,useEffect} from "react";
import {useParams,useNavigate} from "react-router-dom";
import axios from "axios";

function UpdateForm() {

     const{id} = useParams();
     
     const [name,setName]= useState("");
   
     const[description,setDescription] = useState("");
     const [price,setPrice] = useState("");
     const navigate= useNavigate();


    //useEffect hook to fetch the details of the specific SpecialActivity with the given id
    useEffect(()=>{
        
      //to send GET requests to the backend
      axios.get(`http://localhost:8080/SpecialActivity/get/${id}`)
      .then((res)=>{
       
          setName(res.data.specialActivity.name);
          setDescription(res.data.specialActivity.description);
          setPrice(res.data.specialActivity.price);

      }).catch((err)=>{
          //alert(err.message);
          console.error(err.message);
      })
  
         },[id])


        //this function is called when the form is submitted for updating student info
    const handleUpdate=(e) =>{
      //prevents the default form submission behavior
      e.preventDefault();


      //creates an object with the current state values
      const updatedSpecialActivity={
          name,description,price
      
  };  
   
   //sends a PUT request to the backend with the updated student data
   axios.put(`http://localhost:8080/SpecialActivity/update/${id}`, updatedSpecialActivity)
   .then((res) => {
     alert(res.data.status);
     //console.log(res.data.status);
     navigate("/");
   })
   .catch((err) => {
     //alert(err.message);
     console.error(err.message);
   });
}




return (
  <div className="flex items-center justify-center min-h-screen bg-cover">
    <div className="bg-green-600 bg-opacity-90 flex items-center justify-center w-full max-w-[600px] rounded-xl shadow-lg py-14 px-11 text-xl font-extrabold text-black">
      <form className="flex flex-col w-full" onSubmit={handleUpdate}>
        <h2 className="self-center text-3xl text-white mb-8">Update</h2>

        <label htmlFor="name" className="mt-4 text-white">Name</label>
        <input
          type="text"
          id="name"
          className="mt-2 rounded-lg bg-white h-[50px] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="description" className="mt-8 text-white">Description</label>
        <textarea
          id="description"
          className="mt-3 rounded-lg bg-white w-full h-32 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label htmlFor="price" className="mt-8 text-white">Price</label>
        <input
          type="text"
          id="price"
          className="mt-2 rounded-lg bg-white h-[50px] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button
          type="submit"
          className="justify-center self-center px-8 py-3 mt-14 whitespace-nowrap bg-green-800 rounded-lg text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Update
        </button>
      </form>
    </div>
  </div>
);

}

export default UpdateForm;