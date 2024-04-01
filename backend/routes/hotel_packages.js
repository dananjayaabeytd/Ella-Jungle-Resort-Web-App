const router = require("express").Router();
const { response } = require("express");
let Hotel_Package = require("../models/Hotel_Package");


//insert
router.route("/add").post((req,res)=>{

    const package_name = req.body.package_name;
    const room_name = req.body.room_name;
    const SActivity_name = req.body.SActivity_name;
    const spa_name = req.body.spa_name;
    const package_des = req.body.package_des;
    const price = Number(req.body.price);
    const package_img = req.body.package_img;
    

    const newPackage = new Hotel_Package({
        
        package_name,
        room_name,
        SActivity_name,
        spa_name,
        package_des,
        price,
        package_img
    })

    newPackage.save().then(()=>{
        res.json("Package Added")
    }).catch((err)=>{
        console.log(err);
    })
})

//read
router.route("/").get((req,res)=>{

    Hotel_Package.find().then((hotel_packages)=>{
        res.json(hotel_packages)
    }).catch((err) =>{
        console.log(err)
    })
})


//update
router.route("/update/:id").put(async(req,res) =>{
    let packageId = req.params.id;
    const { package_name,room_name,SActivity_name,spa_name,package_des,price,package_img} = req.body;

    const updatePackage = {
      package_name,
      room_name,
      SActivity_name,
      spa_name,
      package_des,
      price,
      package_img
    }

    const update = await Hotel_Package.findByIdAndUpdate(packageId,updatePackage).then(()=>{
        res.status(200).send({status: "Package updated"})
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with updating data",error: err.message});
    })
    
})


//delete
router.route("/delete/:id").delete(async(req,res) =>{
    let packageId = req.params.id;

    await Hotel_Package.findByIdAndDelete(packageId)
    .then(()=>{
        res.status(200).send({status: "Package deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete package",error: err.message});
    })
})


//get specific user
router.route("/get/:id").get(async(req,res)=>{
    let packageId = req.params.id;
    await Hotel_Package.findById(packageId)
    .then((package)=>{
        res.status(200).send({status: "Package fetched",package})
    }).catch((err) =>{
        console.group(err.message);
        res.status(500).send({status:"Error with package",error:err.message})
    })
})

module.exports = router;