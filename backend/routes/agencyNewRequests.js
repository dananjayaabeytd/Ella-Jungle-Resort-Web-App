const Router = require('express').Router();
let AgencyRequest = require('../models/AgencyRequest');

Router.route('/AgencyNewRequest').post((req, res) => {

    const ArrivalDate = req.body.ArrivalDate;
    const DepartureDate = req.body.DepartureDate;
    const NoOfDays = Number(req.body.NoOfDays);
    const NoOfNights = Number(req.body.NoOfNights);
    const NoOfAdults = Number(req.body.NoOfAdults);
    const NoOfChildren = Number(req.body.NoOfChildren);
    const NoOfSingleRooms = Number(req.body.NoOfSingleRooms);
    const NoOfDoubleRooms = Number(req.body.NoOfDoubleRooms);
    const NoOfTripleRooms = Number(req.body.NoOfTripleRooms);
    const MealTypeBreakfast = req.body.MealTypeBreakfast;
    const MealTypeLunch = req.body.MealTypeLunch;
    const MealTypeDinner = req.body.MealTypeDinner;
    const RequestDescription = req.body.RequestDescription;
    const ClientId = req.body.ClientId;
    const AgencyId = req.body.AgencyId;

    const newAgencyRequest = new AgencyRequest({
        ArrivalDate,
        DepartureDate,
        NoOfDays,
        NoOfNights,
        NoOfAdults,
        NoOfChildren,
        NoOfSingleRooms,
        NoOfDoubleRooms,
        NoOfTripleRooms,
        MealTypeBreakfast,
        MealTypeLunch,
        MealTypeDinner,
        RequestDescription,
        ClientId,
        AgencyId
    });

    newAgencyRequest.save().then(() => {
        res.json('Your Request Sent!');
    }).catch((err) => {
        console.log(err);
    });

});


// get all requests from the database
// if want to get only one request use findbyid()  insted of find()

Router.route('/ClientNewRequest').get((req, res) => {
    AgencyRequest.find().then((AgencyRequests) => {
        res.json(AgencyRequests);                            // send data to frontend
    }).catch((err) => {
        console.log(err);
    });
});


// get the request by id

Router.route('/ClientRequest/:id').get(async (req, res) => {
    let requestId = req.params.id; // Get the ID from the URL parameter
    try {
        const clientRequest = await AgencyRequest.findOne({ ClientId: requestId });
        if (clientRequest) {
            res.status(200).json({ status: "Request fetched", clientRequest: clientRequest });
        } else {
            res.status(404).json({ status: "Request not found" });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: "Error with get request", error: err.message });
    }
});




// update the request data
Router.route('/UpdateRequest/:id').put(async (req, res) => {
    const requestId = req.params.id; // Get the ID from the URL parameter
    const { ArrivalDate, DepartureDate, NoOfDays, NoOfNights, NoOfAdults, NoOfChildren, NoOfSingleRooms, NoOfDoubleRooms, NoOfTripleRooms, MealTypeBreakfast, MealTypeLunch, MealTypeDinner, RequestDescription } = req.body; // capture the data from the frontend

    const updateAgencyRequest = { // create an object to update the data
        ArrivalDate,
        DepartureDate,
        NoOfDays,
        NoOfNights,
        NoOfAdults,
        NoOfChildren,
        NoOfSingleRooms,
        NoOfDoubleRooms,
        NoOfTripleRooms,
        MealTypeBreakfast,
        MealTypeLunch,
        MealTypeDinner,
        RequestDescription,
    }

    try {
        const updatedRequest = await AgencyRequest.findByIdAndUpdate(requestId, updateAgencyRequest);
        if (updatedRequest) {
            res.status(200).json({ message: "Request Updated" }); // send the response to the frontend
        } else {
            res.status(404).json({ status: "Request not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error with updating data" }); // send the response to the frontend
    }
});



// delete the request
Router.route('/DeleteRequest/:id').delete(async(req, res) => {
    let id = req.params.id;
    await AgencyRequest.findByIdAndDelete(id).then(() => {
        res.status(200).send({ status: "Request Deleted" });
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with delete request", error: err.message });
    });
});
      


module.exports = Router; // Export the Router object