const mongoose = require('mongoose');
require('dotenv').config();
const {Moment} = require('./schema/moment.js');

const saveEditionListings = (responseData) => {
  let editionData = ''
  count = 0;
  try{
    editionData = responseData.data.searchEditionListings.data.searchSummary.data.data;    
  } catch(e){
    console.log(e.message);
  }


    mongoose
	.connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
    .then(() => {

      editionData.map(async (edition) => {                        

          try{
            console.log(edition.play.stats.playerName + " Ready for update!")
          } catch(e){
            console.log(e.message);
          }
            const filter = { playId: edition.play.id, "set.id": edition.set.id}
            const update = {              
              tags: edition.play.tags,
              "setPlay.tags" : edition.setPlay.tags,
              assets: {
                videos: edition.play.assets.videos,
                images: edition.play.assets.images
              },
              pricing: { 
                minPrice: edition.priceRange.min,
                maxPrice: edition.priceRange.max,
                avgPrice: edition.averageSaleData.averagePrice,
                avgNumDays: edition.averageSaleData.numDays,
                avgNumSales: edition.averageSaleData.numSales,
                listingCount: edition.editionListingCount,
                uniqueSellerCount: edition.uniqueSellerCount
              }
            }

            try{
                await Moment.findOneAndUpdate(filter, update);
                console.log(edition.play.stats.playerName + " updated!")
            } catch(e){
                console.log(e.message);
            }
        })
})
}

exports.saveEditionListings = saveEditionListings