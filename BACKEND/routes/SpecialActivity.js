//import router functions in express package
const router = require("express").Router();
let SpecialActivity = require("../models/SpecialActivity");



router.route("/add").post((req,res)=>{
    const name=req.body.name;
    
    const description = req.body.description;
    const price =Number(req.body.price);

    const newSpecialActivity = new SpecialActivity({
        name,
       //image,
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
    const{name,/*image,*/description,price}=req.body;

    //creating an object to update the data
    const updateSpecialActivity={
        name,
        //image,
        description,
        price
    };
    

    //to check whether an activity exists related to a specific id
    try {
        const updatedActivity = await SpecialActivity.findByIdAndUpdate(userId, updateSpecialActivity, { new: true });
        if (!updatedActivity) {
            return res.status(404).send({ status: "Special Activity not found" });
        }
        res.status(200).send({ status: "Special Activity updated", updatedActivity });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    }
});


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

    try {
        const specialActivity = await SpecialActivity.findById(userId);
        if (!specialActivity) {
            return res.status(404).send({ status: "Special Activity not found" });
        }
        res.status(200).send({ status: "Special Activity fetched", specialActivity });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with get activity", error: err.message });
    }
});


module.exports = router;
