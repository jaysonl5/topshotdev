const queryEditionListings = require('./queryEditionListings')
const querySets = require('./querySets')
const cron = require('node-cron')

const dbUpdateScheduler = async () =>{

    // cron.schedule('30 49 15 * * *', () => {
       let setData = await querySets.querySets();
       let sets = setData.data.searchSets.searchSummary.data.data;
       
       for(let i = 0; i < sets.length; i++){
            let j = i+1
            let subArr = sets.slice(i, j);
            await queryEditionListings.queryEditionListings(subArr);
        }
    // })

}

dbUpdateScheduler();