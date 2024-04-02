const router = require("express").Router();
const Option = require("../models/Option");

// Add an option
router.route("/addOption").post((req,res) => {
    const { optionCategory, optionName, optionPrice } = req.body;

    const newOption = new Option({
        optionCategory,
        optionName,
        optionPrice
    });

    newOption.save().then(() => {      //If Successful
        res.json("Option Added")       //A response in json format to the frontend
    }).catch((err) => {
        console.log(err);               //If Unsuccessful
    })
})






// Get all Options
router.route("/allOptions").get(async (req, res) => {
  try {
    const options = await Option.find();
    res.json(options);
  } catch (error) {
    console.error("Error fetching options:", error.message);
    res.status(500).send({ status: "Error with fetching options", error: error.message });
  }
});





/*Updating details of an option*/
//When http://Localhost:8070/option/update/5fdeu38rsfk is run, 5fdeu38rsfk user is updated
//':id' colon id is says "Fetch whatever comes after the slash as the optionId". Colon is a must
router.route("/updateOption/:id").put(async(req,res) => {         //Always an Asynchronous message wait for a promise. This increases functionality
    let userId = req.params.id;

    const {optionCategory, optionName, optionPrice} = req.body;

    //Create 'update object'
    const updateOption = {
        optionCategory,
        optionName,
        optionPrice
    }

    //If you didn't use the ID as Primary Key, you can use findOneAndUpdate, here.
    //Await helps to halt the function until the promise from async is received
    const update = await Option.findByIdAndUpdate(userId, updateOption)       //Pass the update object as parameter
    .then(() => {
        res.status(200).send({status:"Option Updated"});                      //Success error code:200
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status:"Error with updating option", error:err.message});        //Server error code:500
    })
})







// Delete option
router.route("/deleteOption/:id").delete(async (req, res) => {
  let optionId = req.params.id;

  try {
    await Option.findByIdAndDelete(optionId);
    res.status(200).send({ status: "Option Deleted" });
  } catch (error) {
    console.error("Error deleting option:", error.message);
    res.status(500).send({ status: "Error in deleting option", error: error.message });
  }
});



// Get one option by ID
router.route("/getOption/:id").get(async (req, res) => {
  let optionId = req.params.id;

  try {
    const option = await Option.findById(optionId);
    if (!option) {
      return res.status(404).send({ status: "Option not found" });
    }
    res.status(200).send({ status: "Option Fetched", event });
  } catch (error) {
    console.error("Error fetching option:", error.message);
    res.status(500).send({ status: "Error with get option", error: error.message });
  }
});

module.exports = router;
