const mongoose = require('mongoose');
require('dotenv').config();
const {Set} = require('./schema/set.js');

const saveSets = (responseData) => {
    let setsArr = responseData.data.searchSets.searchSummary.data.data;
    
    mongoose
	.connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
    .then(() => {
    if(setsArr.length > 0){
        setsArr.map(async (set) => {            
            console.log(set.flowName + " saved")
            const newSet = new Set({
                setId: set.id,
                flowId: set.flowId,
                setName: set.flowName,
                seriesNumber: set.flowSeriesNumber,
                assetPath: set.assetPath,
                setVisualID: set.setVisualId                    
            });

            try{
                await newSet.update({upsert: true});
            } catch(e){
                console.log(e);
            }
        })
    }
})
}

exports.saveSets = saveSets