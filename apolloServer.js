const express = require("express");
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
const port = 3001;

const apollo = require("./apollo");
const res = require("express/lib/response");

app.use(express.json());
app.use(cors())
app.use(apollo);
app.use(bodyParser.json)
app.listen(port, console.log(`Example app listening on port ${port}!`))
