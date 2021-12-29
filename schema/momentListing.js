const mongoose = require('mongoose');

const momentListingSchema = mongoose.Schema({
    momentId: {$type: String, index: {unique: true, dropDups: true}},
    playId: String,
    momentUrl: String,
    player: String,
    playerId: String,
    nbaSeason: String,
    teamId: String,
    teamName: String,
    playType: String,
    playCategory: String,
    awayTeamName: String,
    awayTeamScore: Number,
    homeTeamName: String,
    homeTeamScore: Number,
    circulationCount: Number,
    momentDate: Date,
    set: {
        id: String,
        tier: String,
        flowId: Number,
        flowName: String,
        flowSeriesNumber: Number,
        assetPath: String
    },  
    stats: {
        points: Number,
        defensiveRebounds: Number,
        offensiveRebounds: Number,
        rebounds: Number,
        assists: Number,
        assistTurnoverRatio: Number,
        steals: Number,
        blocks: Number,
        statScore: Number,
        tripDub: String,
        twoPointsMade: Number,
        twoPointsAttempted: Number,
        twoPointsPercentage: Number,
        threePointsMade: Number,
        threePointsAttempted: Number,
        threePointsPercentage: Number,
        fieldGoalsMade: Number,
        fliedGoalsAttempted: Number,
        fieldGoalsPercentage: Number,
        freeThrowsMade: Number,
        freeThrowsAttempted: Number,
        freeThrowsPercentage: Number,
        plusMinus: Number
    },
    tags: [{
        id: String,
        title: String,
        visible: Boolean
    }],
    setPlay: {
        tags: [{        
            title: String,
            id: String
        }]
    },
    assets: {
        videos: [{
            type: String,
            url: String,
            videoLength: Number,
            __typename: String
        }],
        images: [{
            type: String,
            url: String,
            __typename: String
        }]
    },
    minPrice: String,
    maxPrice: String,
    avgPrice: String,
    avgNumDays: String,
    avgNumSales: String,
    listingCount: Number,
    uniqueSellerCount: Number,
        
    
},
{ typeKey: '$type'}
);

let MomentListing = mongoose.model("MomentListing", momentListingSchema);

exports.MomentListing = MomentListing;