const express = require('express')
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const {Moment} = require('./schema/moment.js');
const {Set} = require('./schema/set.js');
const { MomentListing } = require('./schema/momentListing.js');


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '/client/build')));

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

          app.post('/momentlistingseed', async (req, res) => {
            console.log("Saving moment: " + req.body.Mome.player);
            const moment = new MomentListing({
                momentId: req.body.Mome.momentId,
                playId: req.body.Mome.id,
                momentUrl: req.body.Mome.momentUrl,
                player: req.body.Mome.playerName,
                playerId: req.body.Mome.playerId,
                nbaSeason: req.body.Mome.nbaSeason,
                teamId: req.body.Mome.teamAtMomentNbaId,    
                teamName: req.body.Mome.teamAtMoment,
                playType: req.body.Mome.playType,
                playCategory: req.body.Mome.playCategory,
                awayTeamName: req.body.Mome.awayTeamName,
                awayTeamScore: req.body.Mome.awayTeamScore,
                homeTeamName: req.body.Mome.homeTeamName,
                homeTeamScore: req.body.Mome.homeTeamScore,
                circulationCount: req.body.Mome.circulationCount,
                momentDate: req.body.Mome.dateOfMoment,
                set: {
                  id: req.body.Mome.set.id,
                  tier: req.body.Mome.set.tier,
                  flowId: req.body.Mome.set.flowId,        
                  flowName: req.body.Mome.set.flowName,
                  flowSeriesNumber: req.body.Mome.set.flowSeriesNumber,
                  assetPath: req.body.Mome.set.assetPath                            
                },
                stats: {
                  points: req.body.Mome.stats.points,
                  defensiveRebounds: req.body.Mome.stats.defensiveRebounds,
                  offensiveRebounds: req.body.Mome.stats.offensiveRebounds,
                  rebounds: req.body.Mome.stats.rebounds,
                  assists: req.body.Mome.stats.assists,
                  assistTurnoverRatio:req.body.Mome.stats.assistTurnoverRatio,
                  steals: req.body.Mome.stats.steals,
                  blocks: req.body.Mome.stats.blocks,
                  statScore: req.body.Mome.stats.statScore,
                  tripDub: req.body.Mome.stats.tripDub,
                  twoPointsMade: req.body.Mome.stats.twoPointsMade,
                  twoPointsAttempted: req.body.Mome.stats.twoPointsAttempted,
                  twoPointsPercentage: req.body.Mome.stats.twoPointsPercentage,
                  threePointsMade: req.body.Mome.stats.threePointsMade,
                  threePointsAttempted: req.body.Mome.stats.threePointsAttempted,
                  threePointsPercentage: req.body.Mome.stats.threePointsPercentage,
                  fieldGoalsMade: req.body.Mome.stats.fieldGoalsMade,
                  fliedGoalsAttempted: req.body.Mome.stats.fliedGoalsAttempted,
                  fieldGoalsPercentage: req.body.Mome.stats.fieldGoalsPercentage,
                  freeThrowsMade: req.body.Mome.stats.freeThrowsMade,
                  freeThrowsAttempted: req.body.Mome.stats.freeThrowsAttempted,
                  freeThrowsPercentage: req.body.Mome.stats.freeThrowsPercentage,
                  plusMinus: req.body.Mome.stats.plusMinus
                },
                tags: req.body.Mome.tags,
                setPlay: {
                  tags: req.body.Mome.setPlay.tags
                },
                assets: {
                  videos: req.body.Mome.assets.videos,
                  images: req.body.Mome.assets.images
                },
                minPrice: req.body.Mome.minPrice,
                maxPrice: req.body.Mome.maxPrice,
                avgPrice:  req.body.Mome.avgPrice,
                avgNumDays:  req.body.Mome.avgNumDays,
                avgNumSales:  req.body.Mome.avgNumSales,
                listingCount: req.body.Mome.listingCount,
                uniqueSellerCount: req.body.Mome.uniqueSellerCount
            });

            try{
                await moment.save();
            } catch(e){
                console.error(e);
            }

            res.status(201).end();
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
            const PAGE_SIZE = 20;
            const page = parseInt(req.query.page || 0);
            const total = await Moment.countDocuments({});
            const sortCategory = req.params.sortcat;
            const moments = await Moment.find().sort(sortCategory)
                .limit(PAGE_SIZE)
                .skip(PAGE_SIZE * page)
            console.log('sent');
            res.json({
                totalPages: Math.ceil(total / PAGE_SIZE)-1,
                moments
            });
        })

        app.listen(port, () => {
            console.log(`Server is listening on port: ${port}`);
        });
    });