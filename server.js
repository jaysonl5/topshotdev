const express = require('express')
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const {Moment} = require('./schema/moment.js');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "client", "public")));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, "client", "public", "index.html"));
})

mongoose
	.connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
	.then(() => {

        app.post('/momentseed', async (req, res) => {

            res.json({Result: "Seed!"})
          })

        app.listen(port, () => {
            console.log(`Server is listening on port: ${port}`);
        });
    });