const mongoose = require('mongoose');

const momentSchema = mongoose.Schema({
    momentId: {$type: String, index: { unique: true, dropDups: true }},
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
        ID: String,
        setId: String,
        playId: String,
        tags: [{        
            title: String,
            id: String,
            level: String
        }],
        circulations: {
            burned: Number,
            hiddenInPacks: Number,
            circulationCount: Number,
            ownedByCollectors: Number,
            forSaleByCollectors: Number,
            unavailableForPurchase: Number

        }

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
    
},
{ typeKey: '$type'}
);

let Moment = mongoose.model("Moment", momentSchema);

exports.Moment = Moment;