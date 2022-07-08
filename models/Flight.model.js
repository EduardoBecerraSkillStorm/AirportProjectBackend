const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({

    departureAirport: String,
    arrivalAirport: String,
    departureDate: String,
    arrivalDate: String,
    departureTime: String, 
    arrivalTime: String, 
    currentPassangerCount: Number,
    addPassenger: Number,
    passengerLimit: Number,
    airlineName: String,
    flightNumber: Number,
});

const Flight = mongoose.model('Flight', flightSchema, 'Flights');
module.exports = Flight;