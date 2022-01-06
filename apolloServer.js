const express = require("express");
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
const port = 3001;

const apollo = require("./apollo");


app.use(express.json());
app.use(cors())
app.use(apollo);
app.use(bodyParser.json)

app.get('/getsets', async(req,res) => {
    const sets = await Set.find()
    console.log('SETS Retrieved!: ' + sets);
    res.send(sets)
  })

app.listen(port, console.log(`Example app listening on port ${port}!`))
