const router = require("express").Router();
const FAQ = require("../models/faqModel");

// Insert / Create
router.route("/addfaq").post((req, res) => {
    const { faqtitle, faqdescription, giverName } = req.body;

    const newFAQ = new FAQ({
        faqtitle,
        faqdescription,
        giverName
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

// Add Reply
router.route("/addreply/:id").put((req, res) => {
    const faqId = req.params.id;
    const { reply } = req.body;

    FAQ.findByIdAndUpdate(faqId, { $push: { replies: reply } })
        .then(() => {
            res.status(200).json({ status: "Reply added." });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});


// Delete Reply
router.route("/deletereply/:id").put((req, res) => {
    const faqId = req.params.id;
    const { index } = req.body;

    FAQ.findById(faqId)
        .then((faq) => {
            if (!faq) {
                return res.status(404).json({ message: "FAQ not found" });
            }
            // Remove the reply at the specified index
            faq.replies.splice(index, 1);
            // Save the updated FAQ
            return faq.save();
        })
        .then(() => {
            res.status(200).json({ status: "Reply deleted." });
        })
        .catch((err) => {
            console.error("Error deleting reply:", err);
            res.status(500).json({ message: "Internal server error" });
        });
});


module.exports = router;
