const express = require('express')
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const {Moment} = require('./schema/moment.js');
const {Set} = require('./schema/set.js');
const { MomentListing } = require('./schema/momentListing.js');
var bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({limit: '1000mb'}));
app.use(bodyParser.urlencoded({ limit: '1000mb', extended: true, parameterLimit: 5000000, arrayLimit: 50000 }));
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

          // function saveMoment(moment) {
          //   return new Promise(resolve => {
          //       moment.save(), function (err, result) {
          //       if(err) throw err;
          //       resolve(result);
          //     };
          //   });
          // }

          app.post('/momentlistingseed', async (req, res, next) => {

            try{

            function checkTripDub(pts, reb, ast, stl, blk){
              let statArr = [pts, reb, ast, stl, blk];
              let count = 0;
              
              statArr.forEach(element => {
                if(element > 9){
                  count++
                }
              });
            
              if(count >= 3){
                return 'X';
              } else {
                return '';
              }
            }

            function findSetTier(setVisualId){
              switch(setVisualId){
                  case "SET_VISUAL_LEGENDARY":
                      return "Legendary"
                  case "SET_VISUAL_RARE":
                      return "Rare"
                  case "SET_VISUAL_COMMON":
                      return "Common"
                  case "SET_VISUAL_FANDOM":
                      return "Fandom"
              }    
            }
            

          req.body.momentsArr.map(async(moment) => { 

            let statScore = moment.play.statsPlayerGameScores.points + moment.play.statsPlayerGameScores.rebounds + 
            moment.play.statsPlayerGameScores.assists + moment.play.statsPlayerGameScores.steals + 
            moment.play.statsPlayerGameScores.blocks;
          
            let tripDub = checkTripDub(moment.play.statsPlayerGameScores.points,moment.play.statsPlayerGameScores.rebounds,
            moment.play.statsPlayerGameScores.assists, moment.play.statsPlayerGameScores.steals, 
            moment.play.statsPlayerGameScores.blocks)

            const newMoment = new MomentListing({
              momentId: moment.id + moment.set.id + moment.play.id,
              playId: moment.play.id,
              momentUrl: moment.assetPathPrefix + "Hero_2880_2880_Black.jpg?width=200?w=256&q=75",
              player: moment.play.stats.playerName,
              playerId: moment.play.stats.playerId,
              nbaSeason: moment.play.stats.nbaSeason,
              teamId: moment.play.stats.teamAtMomentNbaId,    
              teamName: moment.play.stats.teamAtMoment,
              playType: moment.play.stats.playType,
              playCategory: moment.play.stats.playCategory,
              awayTeamName: moment.play.stats.awayTeamName,
              awayTeamScore: moment.play.stats.awayTeamScore,
              homeTeamName: moment.play.stats.homeTeamName,
              homeTeamScore: moment.play.stats.homeTeamScore,
              circulationCount: moment.circulationCount,
              momentDate: moment.play.stats.dateOfMoment,
              set: {
                id: moment.set.id,
                tier: findSetTier(moment.set.setVisualId),
                flowId: moment.set.flowId,        
                flowName: moment.set.flowName,
                flowSeriesNumber: moment.set.flowSeriesNumber,
                assetPath: moment.set.assetPath                            
              },
              stats: {
                points: moment.play.statsPlayerGameScores.points,
                defensiveRebounds: moment.play.statsPlayerGameScores.defensiveRebounds,
                offensiveRebounds: moment.play.statsPlayerGameScores.offensiveRebounds,
                rebounds: moment.play.statsPlayerGameScores.rebounds,
                assists: moment.play.statsPlayerGameScores.assists,
                assistTurnoverRatio: moment.play.statsPlayerGameScores.assistTurnoverRatio,
                steals: moment.play.statsPlayerGameScores.steals,
                blocks: moment.play.statsPlayerGameScores.blocks,
                statScore: statScore,
                tripDub: tripDub,
                twoPointsMade: moment.play.statsPlayerGameScores.twoPointsMade,
                twoPointsAttempted: moment.play.statsPlayerGameScores.twoPointsAttempted,
                twoPointsPercentage: moment.play.statsPlayerGameScores.twoPointsPercentage,
                threePointsMade: moment.play.statsPlayerGameScores.threePointsMade,
                threePointsAttempted: moment.play.statsPlayerGameScores.threePointsAttempted,
                threePointsPercentage: moment.play.statsPlayerGameScores.threePointsPercentage,
                fieldGoalsMade: moment.play.statsPlayerGameScores.fieldGoalsMade,
                fliedGoalsAttempted: moment.play.statsPlayerGameScores.fliedGoalsAttempted,
                fieldGoalsPercentage: moment.play.statsPlayerGameScores.fieldGoalsPercentage,
                freeThrowsMade: moment.play.statsPlayerGameScores.freeThrowsMade,
                freeThrowsAttempted: moment.play.statsPlayerGameScores.freeThrowsAttempted,
                freeThrowsPercentage: moment.play.statsPlayerGameScores.freeThrowsPercentage,
                plusMinus: moment.play.statsPlayerGameScores.plusMinus
              },
              tags: moment.play.tags,
              setPlay: {
                tags: moment.setPlay.tags
              },
              assets: {
                videos: moment.play.assets.videos,
                images: moment.play.assets.images
              },
              minPrice: moment.priceRange.min,
              maxPrice: moment.priceRange.max,
              avgPrice: moment.averageSaleData.averagePrice,
              avgNumDays: moment.averageSaleData.numDays,
              avgNumSales: moment.averageSaleData.numSales,
              listingCount: moment.editionListingCount,
              uniqueSellerCount: moment.uniqueSellerCount
            })

            newMoment.save()
            .then((saved) => {
              console.log(saved.player)
            })
            .catch((err) => {
              console.log ("Error: " + err)
              res.send("Duplicate moment ID")
              next(e)
            })      
          })
          res.status(201);
        } catch(e){
          res.send("Error: " + e)
          next(e)
        }
        
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