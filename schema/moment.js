const mongoose = require('mongoose');

const momentSchema = mongoose.Schema({
    momentUrl: String,
    player: String,
    teamName: String,
    setName: String,
    tier: String,
    playType: String,
    circulationCount: Number,
    momentDate: Date,
    points: Number,
    rebounds: Number,
    assists: Number,
    steals: Number,
    blocks: Number,
    statScore: Number,
    tripDub: Boolean,
    badges: [
        {
            badgeName: String,
            badgeImageUrl: String
        }
    ]

})

let Moment = mongoose.model("Moment", momentSchema);

exports.Moment = Moment;