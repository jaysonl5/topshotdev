const express = require('express')
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const {Moment} = require('./schema/moment.js');
const {Set} = require('./schema/set.js');


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
            console.log("Saving moment: " + req.body.Mome.player);
            const moment = new Moment({
                momentUrl: req.body.Mome.momentUrl,
                    player: req.body.Mome.player,
                    teamName: req.body.Mome.teamName,
                    setName: req.body.Mome.setName,
                    tier: req.body.Mome.tier,
                    playType: req.body.Mome.playType,
                    circulationCount: req.body.Mome.circulationCount,
                    momentDate: req.body.Mome.momentDate,
                    points: req.body.Mome.points,
                    rebounds: req.body.Mome.rebounds,
                    assists: req.body.Mome.assists,
                    steals: req.body.Mome.steals,
                    blocks: req.body.Mome.blocks,
                    statScore: req.body.Mome.statScore,
                    tripDub: req.body.Mome.tripDub,
            });

            try{
                await moment.save();
            } catch(e){
                console.error(e);
            }

            res.json({Result: "Seed!"})
          })

          app.post('/setseed', async (req, res) => {
              console.log(req.body)
            const set = new Set({
                setId: req.body.NewSet.setId,
                flowId: req.body.NewSet.flowId,
                setName: req.body.NewSet.setName,
                seriesNumber: req.body.NewSet.seriesNumber,
                assetPath: req.body.NewSet.assetPath,
                setVisualID: req.body.NewSet.setVisualID                    
            });

            try{
                await set.save();
            } catch(e){
                console.error(e);
            }

            res.json({Result: "Seeded sets!"})
          })

          app.get('/getsets', async(req,res) => {
            const sets = await Set.find()
            console.log('SETS Retrieved!: ' + sets);
            res.send(sets)
          })

          app.get('/moments', async(req,res) => {
              const moments = await Moment.find();
              console.log('Moments retrieved: ' + moments)
              res.send(moments);
          })

          app.get('/moments/:sortcat', async(req,res) => {
              console.log(req.params.sortcat);
              console.log(req.params.sortindex);
            const sortCategory = req.params.sortcat;
            const moments = await Moment.find().sort(sortCategory);
            console.log('sent');
            res.send(moments);
        })

        app.listen(port, () => {
            console.log(`Server is listening on port: ${port}`);
        });
    });