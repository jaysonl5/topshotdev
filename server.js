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
            console.log("Saving set: " + req.body.Set.player);
            const set = new Set({
                setId: req.body.Set.setId,
                flowId: req.body.Set.setId,
                setName: req.body.Set.setId,
                seriesNumber: req.body.Set.setId,
                assetPath: req.body.Set.setId,
                setVisualID: req.body.Set.setId                    
            });

            try{
                await set.save();
            } catch(e){
                console.error(e);
            }

            res.json({Result: "Seeded sets!"})
          })

        app.listen(port, () => {
            console.log(`Server is listening on port: ${port}`);
        });
    });