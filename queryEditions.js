var axios = require('axios');
var saveEditions = require('./saveEditions')

const queryEditions = (sets) => {

    let setIdArray = [];
    sets.map((set) => {
        setIdArray.push(set.id);
    })
        
    var data = JSON.stringify({
    query: `query($input:SearchEditionsInput!) 
    {
      searchEditions(input: $input) 
      {
        searchSummary{
        
        count{
          count
        },
        
            data 
        {
            data
            {
                ... on Edition
                {
                  id
                  version,         
                  assetPathPrefix,
                  circulationCount,
                  set{
                    id,
                    flowName,
                    flowSeriesNumber,
                    setVisualId
                  }
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
                      id,
                      title,
                      visible
                    }
                  },
                  set{
                    id,
                    setVisualId,
                                    flowId,
                    flowName
                  },
                  setPlay
                  {
                    ... on MintedSetPlay{
                      ID,
                      tags{
                        id,
                        title,
                        level,
                        visible                    
                      },
                      setID,
                      playID,
                      circulations{
                        burned,
                        hiddenInPacks,
                        circulationCount,
                        ownedByCollectors,
                        forSaleByCollectors,
                        unavailableForPurchase
                      }                    
                      
                    }
                  
                  },        
                  challengeID,
                  tags{
                    id,
                    visible,
                    title,
                    level,
                    hardcourt,
                  }
                }
              }  
            }
          }
        }
      }`,
    variables: { "input":
    {
        "filters":{
          "bySetIDs": setIdArray
        }
      }}
    });

    var config = {
    method: 'get',
    url: 'http://localhost:3001',
    headers: { 
        'Content-Type': 'application/json'
    },
    data : data
    };


    let editions = axios(config)
    .then(async function (response) {
        if(response.data){
            try{
            return await response.data;
            } catch(e){
                console.log(e.message)
            }
        }
        
    })
    .catch(function (error) {
    console.log(error.message);
    });

    return editions

}

exports.queryEditions = queryEditions