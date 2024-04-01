const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const Event = require("../models/Event");

// Configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Images"); // Ensure this directory exists or multer will throw an error
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Add an event with image
router.route("/add").post(upload.single("file"), async (req, res) => {
  const { eventName, eventCategory, eventDate, eventDescription } = req.body;
  const eventImage = req.file ? req.file.filename : ""; // Check if file exists
  const decorationPreferences = {
    minimalistChecked: req.body["decorationPreferences.minimalistChecked"] === "true",
    elegantChecked: req.body["decorationPreferences.elegantChecked"] === "true",
  };

  try {
    const newEvent = new Event({
      eventName,
      eventCategory,
      eventDate,
      eventDescription,
      decorationPreferences,
      eventImage,
    });

    const savedEvent = await newEvent.save();
    res.json({ status: "Event Added", event: savedEvent });
  } catch (error) {
    console.error("Error adding event:", error.message);
    res.status(500).send({ status: "Error with adding event", error: error.message });
  }
});





// Get all events
router.route("/").get(async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error.message);
    res.status(500).send({ status: "Error with fetching events", error: error.message });
  }
});






// Update event
router.route("/update/:id").put(upload.single("file"), async (req, res) => {
  let eventId = req.params.id;
  const { eventName, eventCategory, eventDate, eventDescription } = req.body;
  const eventImage = req.file ? req.file.filename : ""; // Check if file exists
  
//   // Assuming decorationPreferences come in as an array of "true" values with keys as the preference names
//   const preferences = Object.keys(decorationPreferences).filter(key => decorationPreferences[key] === "true");

  // Assuming decorationPreferences come in as an array of "true" values with keys as the preference names
  //const { decorationPreferences } = req.body;
  const decorationPreferences = {
    minimalistChecked: req.body["decorationPreferences.minimalistChecked"] === "true",
    elegantChecked: req.body["decorationPreferences.elegantChecked"] === "true",
  };


  try {
    const updateEvent = {
      eventName,
      eventCategory,
      eventDate,
      eventDescription,
      //decorationPreferences: preferences, // Update this part based on your actual data structure
      //decorationPreferences: decorationPreferences || [], // If no preferences provided, default to empty array
      decorationPreferences,
      eventImage,
      
    };

    const updatedEvent = await Event.findByIdAndUpdate(eventId, updateEvent, { new: true });
    res.status(200).send({ status: "Event Updated", event: updatedEvent });
  } catch (error) {
    console.error("Error updating event:", error.message);
    res.status(500).send({ status: "Error with updating event", error: error.message });
  }
});







// Delete event
router.route("/delete/:id").delete(async (req, res) => {
  let eventId = req.params.id;

  try {
    await Event.findByIdAndDelete(eventId);
    res.status(200).send({ status: "Event Deleted" });
  } catch (error) {
    console.error("Error deleting event:", error.message);
    res.status(500).send({ status: "Error in deleting Event", error: error.message });
  }
});



// Get one event by ID
router.route("/get/:id").get(async (req, res) => {
  let eventId = req.params.id;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).send({ status: "Event not found" });
    }
    res.status(200).send({ status: "Event Fetched", event });
  } catch (error) {
    console.error("Error fetching event:", error.message);
    res.status(500).send({ status: "Error with get Event", error: error.message });
  }
});

module.exports = router;
