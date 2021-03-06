const mongoose = require('mongoose');
require('dotenv').config();
const {Moment} = require('./schema/moment.js');

const saveEditions = (responseData) => {
    let editionsArr = responseData.data.searchEditions.searchSummary.data.data;
    
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



    mongoose
	.connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
    .then(() => {
    if(editionsArr.length > 0){
        editionsArr.map(async (edition) => {   
            
            console.log(edition)
            
            let statScore = edition.play.statsPlayerGameScores.points + edition.play.statsPlayerGameScores.rebounds + 
            edition.play.statsPlayerGameScores.assists + edition.play.statsPlayerGameScores.steals + 
            edition.play.statsPlayerGameScores.blocks;
          
            let tripDub = checkTripDub(edition.play.statsPlayerGameScores.points,edition.play.statsPlayerGameScores.rebounds,
            edition.play.statsPlayerGameScores.assists, edition.play.statsPlayerGameScores.steals, 
            edition.play.statsPlayerGameScores.blocks)

            const newMoment = new Moment({
            momentId: edition.id,
            playId: edition.play.id,
            momentUrl: edition.assetPathPrefix + "Hero_2880_2880_Black.jpg?width=200?w=256&q=75",
            player: edition.play.stats.playerName,
            playerId: edition.play.stats.playerId,
            nbaSeason: edition.play.stats.nbaSeason,
            teamId: edition.play.stats.teamAtMomentNbaId,    
            teamName: edition.play.stats.teamAtMoment,
            playType: edition.play.stats.playType,
            playCategory: edition.play.stats.playCategory,
            awayTeamName: edition.play.stats.awayTeamName,
            awayTeamScore: edition.play.stats.awayTeamScore,
            homeTeamName: edition.play.stats.homeTeamName,
            homeTeamScore: edition.play.stats.homeTeamScore,
            circulationCount: edition.circulationCount,
            momentDate: edition.play.stats.dateOfMoment,
            set: {
            id: edition.set.id,
            tier: findSetTier(edition.set.setVisualId),
            flowId: edition.set.flowId,        
            flowName: edition.set.flowName,
            flowSeriesNumber: edition.set.flowSeriesNumber,
            assetPath: edition.set.assetPath                            
            },
            stats: {
                points: edition.play.statsPlayerGameScores.points,
                defensiveRebounds: edition.play.statsPlayerGameScores.defensiveRebounds,
                offensiveRebounds: edition.play.statsPlayerGameScores.offensiveRebounds,
                rebounds: edition.play.statsPlayerGameScores.rebounds,
                assists: edition.play.statsPlayerGameScores.assists,
                assistTurnoverRatio: edition.play.statsPlayerGameScores.assistTurnoverRatio,
                steals: edition.play.statsPlayerGameScores.steals,
                blocks: edition.play.statsPlayerGameScores.blocks,
                statScore: statScore,
                tripDub: tripDub,
                twoPointsMade: edition.play.statsPlayerGameScores.twoPointsMade,
                twoPointsAttempted: edition.play.statsPlayerGameScores.twoPointsAttempted,
                twoPointsPercentage: edition.play.statsPlayerGameScores.twoPointsPercentage,
                threePointsMade: edition.play.statsPlayerGameScores.threePointsMade,
                threePointsAttempted: edition.play.statsPlayerGameScores.threePointsAttempted,
                threePointsPercentage: edition.play.statsPlayerGameScores.threePointsPercentage,
                fieldGoalsMade: edition.play.statsPlayerGameScores.fieldGoalsMade,
                fliedGoalsAttempted: edition.play.statsPlayerGameScores.fliedGoalsAttempted,
                fieldGoalsPercentage: edition.play.statsPlayerGameScores.fieldGoalsPercentage,
                freeThrowsMade: edition.play.statsPlayerGameScores.freeThrowsMade,
                freeThrowsAttempted: edition.play.statsPlayerGameScores.freeThrowsAttempted,
                freeThrowsPercentage: edition.play.statsPlayerGameScores.freeThrowsPercentage,
                plusMinus: edition.play.statsPlayerGameScores.plusMinus
            },
            tags: edition.play.tags,
            setPlay: {
                ID: edition.setPlay.ID,
                setID: edition.setPlay.setID,
                playID: edition.setPlay.playID,
                circulations: {
                    burned: edition.setPlay.circulations.burned,
                    hiddenInPacks: edition.setPlay.circulations.hiddenInPacks,
                    circulationCount: edition.setPlay.circulations.circulationCount,
                    ownedByCollectors: edition.setPlay.circulations.ownedByCollectors,
                    forSaleByCollectors: edition.setPlay.circulations.forSaleByCollectors,
                    unavailableForPurchase: edition.setPlay.circulations.unavailableForPurchase
                }
            },
            
            });

            try{
                await newMoment.update({upsert: true});
                console.log(edition.play.stats.playerName)
            } catch(e){
                console.log(e.message);
            }
        })
    }
})
}

exports.saveEditions = saveEditions