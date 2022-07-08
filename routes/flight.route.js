const router = require('express').Router();
const { createFlight, findAllFlights, getFlight } = require('../controllers/flight.controller');

router.get('/', async (req , res) => {
    const flights = await findAllFlights();
    res.json(flights);
})

router.post('/', async (req, res) => {
try {
    const flight = await createFlight(req.body);
    res.json(flight);
} catch (err) {
    res.status(err?.status || 400).json(err);
}

})

router.get('/:id', getFlight, (req, res) => {
    res.send(res.flight)

})

router.put('/:id', getFlight, async (req, res) => {
if (req.body.departureAirport != null) {
    res.flight.departureAirport = req.body.departureAirport;
}
if (req.body.arrivalAirport != null) {
    res.flight.arrivalAirport = req.body.arrivalAirport;
}
if (req.body.departureDate != null) {
    res.flight.departureDate = req.body.departureDate;
}
if (req.body.arrivalDate != null) {
    res.flight.arrivalDate = req.body.arrivalDate;
}
if (req.body.departureTime != null) {
    res.flight.departureTime = req.body.departureTime;
}
if (req.body.arrivalTime != null) {
    res.flight.arrivalTime = req.body.arrivalTime;
}
if (req.body.addPassenger != null) {


console.log(req.body.addPassenger + " Add Pass")
    const seatsLeft = res.flight.passengerLimit - res.flight.currentPassangerCount;
    if(seatsLeft < req.body.addPassenger) {
    return res.status(400).json({ message: ` You have reached the limit of ${res.flight.passengerLimit} passengers on this plane.`})
    } 
    if (req.body.addPassenger == -1 && res.flight.currentPassangerCount == 0) {
        return res.status(400).json({ message: `There are no passengers to remove.`})    
    }  


    let add = Number(req.body.addPassenger);
    let current = res.flight.currentPassangerCount;
 
    let count = current + add; 

    res.flight.currentPassangerCount = count;
    res.flight.addPassenger = add;
  

}
if (req.body.passengerLimit != null) {
    res.flight.passengerLimit = req.body.passengerLimit;
}
if (req.body.airlineName != null) {
    res.flight.airlineName = req.body.airlineName;
}
if (req.body.flightNumber != null) {
    res.flight.flightNumber = req.body.flightNumber;
}
try {
    const updatedFlight = await res.flight.save()
    res.json(updatedFlight)
} catch (err) {
    res.status(400).json({ message: "Flight not updated"})
}

})

router.delete('/:id', getFlight, async (req, res) => {
try {
    await res.flight.remove();
    res.json({message: 'Flight deleted.'})
} catch (err) {
    res.status(500).json({message: 'Flight not found'})
}
    
})

module.exports = router;