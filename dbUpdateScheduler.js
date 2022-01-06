const queryEditionListings = require('./queryEditionListings')
const querySets = require('./querySets')
const cron = require('node-cron')
const axios = require('axios')
const res = require('express/lib/response')

const dbUpdateScheduler = async () =>{

    cron.schedule('30 38 12 * * *', () => {
        querySets.querySets();
    })



    cron.schedule('59 39 12 * * *', () => {

        let fetchSets = async () => {
            await axios.get('http://localhost:3001/getsets')
            .then((res) => {
                console.log(res)
                queryEditionListings.queryEditionListings(res);
            })
            .catch(err => console.log(err.message))
        }

        fetchSets();
    })

}

dbUpdateScheduler();