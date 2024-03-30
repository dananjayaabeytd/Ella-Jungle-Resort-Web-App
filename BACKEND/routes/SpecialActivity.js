//import router functions in express package
const router = require("express").Router();
let SpecialActivity = require("../models/SpecialActivity");



router.route("/add").post((req,res)=>{
    const name=req.body.name;
    const image=req.body.image;
    const description = req.body.description;
    const price =Number(req.body.price);

    const newSpecialActivity = new SpecialActivity({
        name,
       
        description,
        price
    })


     //send the values of the above properties to the db
     newSpecialActivity.save().then(()=>{
        res.json("Special Activity added")
    }).catch((err)=>{
        console.log(err);
    })

})



//to view all the values added
router.route("/").get((req,res)=>{
    SpecialActivity.find().then((SpecialActivity)=>{
        res.json(SpecialActivity)
    }).catch((err)=>{
        console.log(err)
    })
})


//to update values
router.route("/update/:id").put(async(req,res)=>{

    //fetch the id comes as a parameter in the request
    let userId = req.params.id;
    
    //fetching the newly updated data in destructive format
    const{name,image,description,price}=req.body;

    //creating an object to update the data
    const updateSpecialActivity={
        name,
        
        description,
        price
    }
    

    //to check whether an activity exists related to a specific id
    const update = await SpecialActivity.findByIdAndUpdate(userId,updateSpecialActivity)
    .then(()=>{
        res.status(200).send({status:"Special Activity updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message});
    })

})



//to delete a user
router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;

    await SpecialActivity.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status:"Special Activity deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with deleting special actvities", error:err.message});
    })
})




//to retreive data of a one activity
router.route("/get/:id").get(async(req,res)=>{
    let userId = req.params.id;

    const user = await SpecialActivity.findById(userId)
    .then((SpecialActivity)=>{
        res.status(200).send({status:"Special Activity fetched",SpecialActivity})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get activity", error: err.message});
    })
})


module.exports = router;
