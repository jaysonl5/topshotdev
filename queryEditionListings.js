var axios = require('axios');
var saveEditionListings = require('./saveEditionListings')

const queryEditionListings = (edition) => {

    // console.log("************* EDITION ************ ");
    // console.log(edition.set.id + " " + edition.play.id)
        
    var data = JSON.stringify({
    query: `# Write your query or mutation here
    query($input:SearchEditionListingsInput!) 
        {
        searchEditionListings(input: $input) 
        {
                data 
            {
            filters 
            {
                byPlayers
            },
            sortBy,
            searchSummary
            {
                data
                {
                data
                {
                    ... on EditionListing
                    {
                    id,              
                    assetPathPrefix,
                    play{
                        id,
                        stats{
                            playerName
                        },                 
                        tags{
                        id
                        title,
                        visible,                                  
                        }
                        assets{
                          videos{
                              url,
                              videoLength,
                              type                    
                          },
                          images{
                              url,
                              type
                          }
                        }
                    },
                    set{
                        id,                
                        flowName,
                    },
                    setPlay{
                        tags{
                        title,
                        id
                        }
                    }
                    priceRange
                    {
                        min,
                        max,                
                    },
                    averageSaleData{
                        averagePrice,
                        numDays,
                        numSales
                    }
                    ,
                    editionListingCount,
                    uniqueSellerCount,
                    userOwnedEditionsCount
                    }
                }  
                }
            }
            }
        }
        }`,
    variables: {"input":{"filters":{"byPlayIDs":[edition.play.id], "bySets": [edition.set.id]},"searchInput":{"pagination":{"cursor":"","direction":"LEFT","limit":0}},"sortBy":"CREATED_AT_ASC"}}
    });

    var config = {
    method: 'get',
    url: 'http://localhost:3001',
    headers: { 
        'Content-Type': 'application/json'
    },
    data : data
    };


    let editionListings = axios(config)
    .then(async function (response) {
        if(response.data){
            try{
            // await saveEditionListings.saveEditionListings(response.data);
                return response.data
            } catch(e){
                console.log(e.message)
            }
        }
        
    })
    .catch(function (error) {
    console.log(error.message);
    });

    return editionListings
}

exports.queryEditionListings = queryEditionListings