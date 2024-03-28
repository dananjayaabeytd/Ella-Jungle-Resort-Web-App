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
        RequestDescription
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


Router.route('/clientRequest/:id').get(async(req, res) => {      // async is used to wait for the response untill it finish
    let id = req.params.id;                                      // get the id from the url as a parameter
    AgencyRequest.findById(id).then((AgencyRequest) => {
        res.json(AgencyRequest);
    }).catch((err) => {
        console.log(err);
    });
});




module.exports = Router;