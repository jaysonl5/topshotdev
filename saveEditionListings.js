const mongoose = require('mongoose');
require('dotenv').config();
const {MomentListing} = require('./schema/momentListing.js');

const saveEditionListings = (responseData) => {
    let editionsArr = responseData.data.searchEditionListings.data.searchSummary.data.data;
    
    mongoose
	.connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
    .then(() => {
    if(editionsArr.length > 0){
        editionsArr.map(async (edition) => {            
            console.log(edition.play.stats.playerName)
            const newMomentListing = new MomentListing({
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
            tags: edition.setPlay.tags
            },
            assets: {
            videos: edition.play.assets.videos,
            images: edition.play.assets.images
            },
            minPrice: edition.priceRange.min,
            maxPrice: edition.priceRange.max,
            avgPrice: edition.averageSaleData.averagePrice,
            avgNumDays: edition.averageSaleData.numDays,
            avgNumSales: edition.averageSaleData.numSales,
            listingCount: edition.editionListingCount,
            uniqueSellerCount: edition.uniqueSellerCount

            });

            try{
                await newMomentListing.save();
            } catch(e){
                console.log(e);
            }
        })
    }
})
}

exports.saveEditionListings = saveEditionListings