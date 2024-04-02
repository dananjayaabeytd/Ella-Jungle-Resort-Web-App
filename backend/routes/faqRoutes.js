const router = require("express").Router();
const FAQ = require("../models/faqModel");

// Insert / Create
router.route("/addfaq").post((req, res) => {
    const { faqtitle, faqdescription } = req.body;

    const newFAQ = new FAQ({
        faqtitle,
        faqdescription
    });

    newFAQ.save()
        .then(() => {
            res.json("FAQ Added.");
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

// Read
router.route("/").get((req, res) => {
    FAQ.find()
        .then((faqs) => {
            res.json(faqs);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

// Update Likes
router.route("/like/:id").put((req, res) => {
    const faqId = req.params.id;

    FAQ.findByIdAndUpdate(faqId, { $inc: { likes: 1 } })
        .then(() => {
            res.status(200).json({ status: "Like Updated." });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

// Update Dislikes
router.route("/dislike/:id").put((req, res) => {
    const faqId = req.params.id;

    FAQ.findByIdAndUpdate(faqId, { $inc: { dislikes: 1 } })
        .then(() => {
            res.status(200).json({ status: "Dislike Updated." });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

// Delete
router.route("/deletefaq/:id").delete((req, res) => {
    const faqId = req.params.id;

    FAQ.findByIdAndDelete(faqId)
        .then(() => {
            res.status(200).json({ status: "FAQ deleted." });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

module.exports = router;
