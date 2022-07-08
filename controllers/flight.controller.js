const Flight = require('../models/Flight.model');

const createFlight = async({
    departureAirport,
    arrivalAirport,
    departureDate,
    arrivalDate,
    departureTime,
    arrivalTime,
    currentPassangerCount = 0,
    addPassenger = 0,
    passengerLimit,
    airlineName,
    flightNumber = Math.floor(100 + Math.random() * 899)
   }) => {
        try {
            const flight = new Flight({
                departureAirport,
                arrivalAirport,
                departureDate,
                arrivalDate,
                departureTime,
                arrivalTime,
                currentPassangerCount,
                addPassenger,
                passengerLimit,
                airlineName,
                flightNumber 
               
            });
            await flight.save();
            return flight;
        } catch (err) {
            console.error(err);
            throw { status: 400, message: err};
        }
    }

const updateFlightPassenger = async ({
    _id,
    currentPassangerCount,
    addPassenger,
    passengerLimit}) => {
        try {
            if ( currentPassangerCount + addPassenger > passengerLimit ) {
                throw `Passenger Limit has been reached`;
            }
            const flight = await Flight.findByIdAndUpdate(_id, { $push: { currentPassangerCount } } )
            return flight;
        } catch {
            console.error(err);
            throw { status: 400, message: err };
        }
    }

    const findAllFlights = async () => {
        const flights = await Flight.find();
        return flights;
    }

    const getFlight = async (req, res, next) => {
        let flight = null 
        try {
            flight = await Flight.findById(req.params.id);
         
            console.log(flight + "1st");

        } catch (err) {
            console.log(flight + "2nd");
            return res.status(400).json({ message: 'Flight not found.'})
           
        } 

        res.flight = flight;
        next()

    }

    module.exports = { createFlight, updateFlightPassenger, findAllFlights, getFlight };