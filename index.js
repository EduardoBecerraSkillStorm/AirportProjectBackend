const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());
app.use(logger);

const flightRouter =  require('./routes/flight.route.js');
app.use('/flights', flightRouter);

app.all('*', (req, res) => {
    res.status(404).send('Hello, the page you are looking for doesent not exist.');
});



mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true,useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to Mongo' );
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });


app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);

})