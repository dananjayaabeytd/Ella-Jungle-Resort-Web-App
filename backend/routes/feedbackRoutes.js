const router = require("express").Router();
const Feedback = require("../models/feedbackModel");

router.route("/addfeedback").post((req, res) => {
    const { fbtitle, fbdescription, rating, giverName, giverId } = req.body;

    const newFeedback = new Feedback({
        fbtitle,
        fbdescription,
        rating,
        giverName,
        giverId
    });

    newFeedback.save()
        .then(() => res.json("Feedback Added."))
        .catch((err) => res.status(400).json("Error: " + err));
});

// Read
router.route("/").get((req, res) => {
    Feedback.find()
        .then((feedbacks) => {
            res.json(feedbacks);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});


// Get feedbacks by giverName
router.route("/feedbacksByGiver/:giverName").get((req, res) => {
    const giverName = req.params.giverName;

    Feedback.find({ giverName: giverName })
        .then(feedbacks => {
            if (feedbacks.length) {
                res.json(feedbacks);
            } else {
                res.status(404).json("No feedbacks found for the given name.");
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});


// Get feedbacks by giverId
router.route("/feedbacksByGiverId/:giverId").get((req, res) => {
    const giverId = req.params.giverId;

    Feedback.find({ giverId: giverId })
        .then(feedbacks => {
            if (feedbacks.length) {
                res.json(feedbacks);
            } else {
                res.status(404).json("No feedbacks found for the given ID.");
            }
        })
        .catch(err => res.status(400).json("Error: " + err));
});


// Update
router.route("/updatefeedback/:id").put((req, res) => {
    const { fbtitle, fbdescription, rating } = req.body;
    const feedbackId = req.params.id;

    Feedback.findByIdAndUpdate(feedbackId, { fbtitle, fbdescription, rating })
        .then(() => {
            res.status(200).json({ status: "Feedback Updated." });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

// Delete
router.route("/deletefeedback/:id").delete((req, res) => {
    const feedbackId = req.params.id;

    Feedback.findByIdAndDelete(feedbackId)
        .then(() => {
            res.status(200).json({ status: "Feedback deleted." });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

module.exports = router;