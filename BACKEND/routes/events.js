
const router = require ("express").Router();
let Event = require("../models/Event")      //Using Event model in Models folder

router.route("/add").post((req,res) => {
    const { eventName, eventCategory, eventDate, eventDescription } = req.body;

    // Convert the eventDate to a Date object
    const newEvent = new Event({
        eventName,
        eventCategory,
        eventDate: new Date(eventDate),
        eventDescription
    });

    newEvent.save().then(() => {      //If Successful
        res.json("Event Added")       //A response in json format to the frontend
    }).catch((err) => {
        console.log(err);               //If Unsuccessful
    })
})



//If you run this URL - http://localhost:8070/event, the body of this below function is executed
router.route("/").get((req,res) => {
    Event.find().then((events) => {
        res.json(events)
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status:"Error with adding event", error:err.message});
    })
})




/*Updating details of an event*/
//When http://Localhost:8070/student/update/5fdeu38rsfk is run, 5fdeu38rsfk user is updated
//':id' colon id is says "Fetch whatever comes after the slash as the studentID". Colon is a must
router.route("/update/:id").put(async(req,res) => {         //Always an Asynchronous message wait for a promise. This increases functionality
    let userId = req.params.id;

    const {eventName, eventCategory, eventDate, eventDescription} = req.body;

    //Create 'update object'
    const updateEvent = {
        eventName,
        eventCategory,
        eventDate,
        eventDescription
    }

    //If you didn't use the ID as Primary Key, you can use findOneAndUpdate, here.
    //Await helps to halt the function until the promise from async is received
    const update = await Event.findByIdAndUpdate(userId, updateEvent)       //Pass the update object as parameter
    .then(() => {
        res.status(200).send({status:"Event Updated"});                      //Success error code:200
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status:"Error with updating event", error:err.message});        //Server error code:500
    })
})




/*Deleting an event*/
router.route("/delete/:id").delete(async(req,res) => {
    let eventId = req.params.id;

    await Event.findByIdAndDelete(eventId)
    .then(() => {
        res.status(200).send({status:"Event Deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status:"Error in deleting Event", error:err.message});
    })
})




/*Getting details of one event */
router.route("/get/:id").get(async(req,res) => {
    let eventId = req.params.id;
    const event = await Event.findById(eventId)
    .then((event)=> {
        res.status(200).send({status: "Event Fetched", event});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get Event", error: err.message});
    })
})

module.exports = router;