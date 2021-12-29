import { gql, useLazyQuery, useQuery } from "@apollo/client"
import axios from 'axios';
import { useState, React } from 'react';

const getMomentsMasterQuery = gql`
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
}`

  function findSetTier(setVisualId){
    switch(setVisualId){
        case "SET_VISUAL_LEGENDARY":
            return "Legendary"
        case "SET_VISUAL_RARE":
            return "Rare"
        case "SET_VISUAL_COMMON":
            return "Common"
        case "SET_VISUAL_FANDOM":
            return "Fandom"
    }    
  }
  
  function checkTripDub(pts, reb, ast, stl, blk){
    let statArr = [pts, reb, ast, stl, blk];
    let count = 0;
    
    statArr.forEach(element => {
      if(element > 9){
        count++
      }
    });
  
    if(count >= 3){
      return 'X';
    } else {
      return '';
    }
  }

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  const sendPostRequest = async (Mome) => {
    try {
      console.log("TRYING")
        sleep(100000)
        const resp = await axios.post('/momentlistingseed', {
          Mome
        });
        console.log(resp.data);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};


function createMoment(data){
  console.log(data.searchEditionListings)
        let moments = data.searchEditionListings.data.searchSummary.data.data
        console.log(moments)
        moments.map(moment => {
          let statScore = moment.play.statsPlayerGameScores.points + moment.play.statsPlayerGameScores.rebounds + 
        moment.play.statsPlayerGameScores.assists + moment.play.statsPlayerGameScores.steals + 
        moment.play.statsPlayerGameScores.blocks;

    let tripDub = checkTripDub(moment.play.statsPlayerGameScores.points,moment.play.statsPlayerGameScores.rebounds,
        moment.play.statsPlayerGameScores.assists, moment.play.statsPlayerGameScores.steals, 
        moment.play.statsPlayerGameScores.blocks)

    let Mome = ({
        momentId: moment.id,
        playId: moment.play.id,
        momentUrl: moment.assetPathPrefix + "Hero_2880_2880_Black.jpg?width=200?w=256&q=75",
        player: moment.play.stats.playerName,
        playerId: moment.play.stats.playerId,
        nbaSeason: moment.play.stats.nbaSeason,
        teamId: moment.play.stats.teamAtMomentNbaId,    
        teamName: moment.play.stats.teamAtMoment,
        playType: moment.play.stats.playType,
        playCategory: moment.play.stats.playCategory,
        awayTeamName: moment.play.stats.awayTeamName,
        awayTeamScore: moment.play.stats.awayTeamScore,
        homeTeamName: moment.play.stats.homeTeamName,
        homeTeamScore: moment.play.stats.homeTeamScore,
        circulationCount: moment.circulationCount,
        momentDate: moment.play.stats.dateOfMoment,
        set: {
          id: moment.set.id,
          tier: findSetTier(moment.set.setVisualId),
          flowId: moment.set.flowId,        
          flowName: moment.set.flowName,
          flowSeriesNumber: moment.set.flowSeriesNumber,
          assetPath: moment.set.assetPath                            
        },
        stats: {
          points: moment.play.statsPlayerGameScores.points,
          defensiveRebounds: moment.play.statsPlayerGameScores.defensiveRebounds,
          offensiveRebounds: moment.play.statsPlayerGameScores.offensiveRebounds,
          rebounds: moment.play.statsPlayerGameScores.rebounds,
          assists: moment.play.statsPlayerGameScores.assists,
          assistTurnoverRatio: moment.play.statsPlayerGameScores.assistTurnoverRatio,
          steals: moment.play.statsPlayerGameScores.steals,
          blocks: moment.play.statsPlayerGameScores.blocks,
          statScore: statScore,
          tripDub: tripDub,
          twoPointsMade: moment.play.statsPlayerGameScores.twoPointsMade,
          twoPointsAttempted: moment.play.statsPlayerGameScores.twoPointsAttempted,
          twoPointsPercentage: moment.play.statsPlayerGameScores.twoPointsPercentage,
          threePointsMade: moment.play.statsPlayerGameScores.threePointsMade,
          threePointsAttempted: moment.play.statsPlayerGameScores.threePointsAttempted,
          threePointsPercentage: moment.play.statsPlayerGameScores.threePointsPercentage,
          fieldGoalsMade: moment.play.statsPlayerGameScores.fieldGoalsMade,
          fliedGoalsAttempted: moment.play.statsPlayerGameScores.fliedGoalsAttempted,
          fieldGoalsPercentage: moment.play.statsPlayerGameScores.fieldGoalsPercentage,
          freeThrowsMade: moment.play.statsPlayerGameScores.freeThrowsMade,
          freeThrowsAttempted: moment.play.statsPlayerGameScores.freeThrowsAttempted,
          freeThrowsPercentage: moment.play.statsPlayerGameScores.freeThrowsPercentage,
          plusMinus: moment.play.statsPlayerGameScores.plusMinus
        },
        tags: moment.play.tags,
        setPlay: {
          tags: moment.setPlay.tags
        },
        assets: {
          videos: moment.play.assets.videos,
          images: moment.play.assets.images
        },
        minPrice: moment.priceRange.min,
        maxPrice: moment.priceRange.max,
        avgPrice: moment.averageSaleData.averagePrice,
        avgNumDays: moment.averageSaleData.numDays,
        avgNumSales: moment.averageSaleData.numSales,
        listingCount: moment.editionListingCount,
        uniqueSellerCount: moment.uniqueSellerCount

        });
        sleep(100000)
        sendPostRequest(Mome);
        sleep(100000)

        })

}



  

export default function GetMomentListings({set}) {
  console.log(set);

  let setIdArray = []
  set.map(set => {
    setIdArray.push(set.setId);
  })


      const { loading, error, data } = useQuery(getMomentsMasterQuery, { 
        variables: { input: 
          {
            "filters":{
              "bySets": setIdArray
            },
            "searchInput": {
              "pagination": {
                "cursor": "",
                "direction": "LEFT",
                "limit": 0
              }
            },
            "sortBy":"CREATED_AT_ASC"
          }
        },
        context: 
          {
              headers:
              {
                  "user" : "Jayson Lewis - jayson.lewis5@gmail.com - 918.527.0315"
              }
          }    
      });

      if(loading) return <div>Loading Moments from Sets!</div>;
      if (error) return `Error ${error.message}`;
      if(data) {        
        
        console.log("Create Moment called")
        createMoment(data);
        return(
            <div>
                <p>Calling seed Momes:</p>                
            </div>
        );
      }
}