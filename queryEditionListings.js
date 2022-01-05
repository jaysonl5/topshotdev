var axios = require('axios');

const queryEditionListings = (sets) => {
        
    var data = JSON.stringify({
    query: `query($input:SearchEditionListingsInput!) 
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
                    playerID,
                    playerName,
                    nbaSeason,
                    teamAtMoment,
                    teamAtMomentNbaId,
                    dateOfMoment,    
                    playType,
                    playCategory,
                    awayTeamName,
                    awayTeamScore,
                    homeTeamName,
                    homeTeamScore
                    },                
                    statsPlayerGameScores{
                    twoPointsMade,
                    twoPointsAttempted,
                    twoPointsPercentage,
                    threePointsMade,
                    threePointsAttempted,
                    threePointsPercentage,
                    fieldGoalsMade,
                    fieldGoalsAttempted,
                    fieldGoalsPercentage,
                    freeThrowsMade,
                    freeThrowsAttempted,
                    freeThrowsPercentage
                    points,
                    defensiveRebounds,
                    offensiveRebounds,
                    rebounds,
                    assists,
                    assistTurnoverRatio,
                    steals,
                    blocks,
                    plusMinus,
                    
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
                    setVisualId,
                                    flowId,
                    flowName,
                    flowSeriesNumber,
                    assetPath
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
    variables: {"input":{"filters":{"bySets":sets},"searchInput":{"pagination":{"cursor":"","direction":"LEFT","limit":0}},"sortBy":"CREATED_AT_ASC"}}
    });

    var config = {
    method: 'get',
    url: 'http://localhost:3001',
    headers: { 
        'Content-Type': 'application/json'
    },
    data : data
    };


    axios(config)
    .then(function (response) {
        let moments = response.data.data.searchEditionListings.data.searchSummary.data.data        
        return moments
    })
    .catch(function (error) {
    console.log(error);
    });

}

exports.queryEditionListings = queryEditionListings