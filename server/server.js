const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const BodyParser = require('body-parser');
const cors = require('cors');
const createRouter = require('./helpers/create_router.js')

//cors and body parser
app.use(cors());
app.use(BodyParser.json());

//database environment variable
const databaseURL = process.env.DATABASE_URL;

MongoClient.connect(databaseURL)
    .then((client) => {
        const db = client.db('monopoly');
        const propertiesCollection = db.collection('properties');
        const playersCollection = db.collection('players');
        const propertiesRouter = createRouter(propertiesCollection);
        const playersRouter = createRouter(playersCollection);
        app.use('/api/properties', propertiesRouter);
        app.use('/api/players', playersRouter);
    })
    .catch(console.error);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})