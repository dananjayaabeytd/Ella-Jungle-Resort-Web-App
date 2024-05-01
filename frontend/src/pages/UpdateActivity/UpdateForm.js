
import  React,{useState,useEffect} from "react";
import {useParams,useNavigate} from "react-router-dom";
import axios from "axios";
import ActivityBackground from '../../assets/ActivityBackground.jpg';

function UpdateForm() {

     const{id} = useParams();
     
     const [name,setName]= useState("");
     //const [image,setImage]= useState("");
     const[description,setDescription] = useState("");
     const [distance,setDistance] = useState("");
     const [price,setPrice] = useState("");
     const navigate= useNavigate();



    //useEffect hook to fetch the details of the specific SpecialActivity with the given id
    useEffect(()=>{
        


      //to send GET requests to the backend
      axios.get(`http://localhost:8080/SpecialActivity/get/${id}`)
      .then((res)=>{
       


          setName(res.data.specialActivity.name);
          //setImage(res.data.specialActivity.image);
          setDescription(res.data.specialActivity.description);
          setDistance(res.data.specialActivity.distance);
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
          name,/*image*/description,distance,price
      
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
};


const handleNameChange=(e)=>{
  const value = e.target.value.replace(/[^A-Za-z ]/gi, "");
  setName(value);
}


const handleDistanceChange=(e)=>{
  const value = Math.max(0,parseFloat(e.target.value));
  setDistance(value);
}


const handlePriceChange=(e)=>{
  const value = Math.max(0,parseFloat(e.target.value));
  setPrice(value);
}



return (
  <div className="flex items-center justify-center min-h-screen bg-cover"style={{ backgroundImage: `url(${ActivityBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <div className="bg-green-600 bg-opacity-50 flex items-center justify-center w-full max-w-[600px] rounded-xl shadow-lg shadow-black py-14 px-11 text-xl font-extrabold text-black">
      <form className="flex flex-col w-full" onSubmit={handleUpdate}>
        <h2 className="self-center text-3xl text-white mb-8">Update</h2>



        <label htmlFor="name" className="mt-4 text-white">Name</label>
        <input
          type="text"
          id="name"
          className="mt-2 rounded-lg bg-white h-[50px] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={name}
          onChange={handleNameChange}
        />



        <label htmlFor="description" className="mt-8 text-white">Description</label>
        <textarea
          id="description"
          className="mt-3 rounded-lg bg-white w-full h-32 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>


        <label htmlFor="distance" className="mt-8 text-white">Distance</label>
        <input
          type="number"
          id="distance"
          className="mt-2 rounded-lg bg-white h-[50px] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={distance}
          onChange={handleDistanceChange}
        />



        <label htmlFor="price" className="mt-8 text-white">Price</label>
        <input
          type="number"
          id="price"
          className="mt-2 rounded-lg bg-white h-[50px] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={price}
          onChange={handlePriceChange}
        />



        <button
          type="submit"
          className="justify-center self-center px-8 py-3 mt-14 whitespace-nowrap bg-green-800 rounded-lg text-white font-semibold
           hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-lg shadow-black">

          Update

        </button>


      </form>
    </div>
  </div>
);

}



export default UpdateForm;