const queryEditionListings = require('./queryEditionListings')
const queryEditions = require('./queryEditions')
const querySets = require('./querySets')
const cron = require('node-cron')
const { saveEditionListings } = require('./saveEditionListings')
const { saveEditions } = require('./saveEditions')

const dbUpdateScheduler = async () =>{

    cron.schedule('30 49 15 * * *', () => {
       let setData = await querySets.querySets();
       let sets = setData.data.searchSets.searchSummary.data.data;
       
       let editions = []
       for(let i = 0; i < sets.length; i++){
            editions = await queryEditions.queryEditions([sets[i]]);
            saveEditions(editions)
        }
    })


}

dbUpdateScheduler();