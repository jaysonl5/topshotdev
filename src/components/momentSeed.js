import axios from 'axios';
const { gql } = require('@apollo/client');
const { graphql, useQuery } = require('react-apollo');
require('dotenv').config();
const {Moment} = require('../schema/moment');
const {React} = require('react');

function pullSets(props){
  return props.sets;
}

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

const getMomentsMasterQuery = gql`
query($input:SearchEditionsInput!) 
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
                  playCategory,                  
                  teamAtMoment,
                  dateOfMoment,
                  homeTeamScore,
                  awayTeamScore
                },
                statsPlayerGameScores{
                  points,
                  rebounds,
                  assists,
                  steals,
                  blocks                  
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
                ID,
                setID,
                playID,
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
  }`


 

function SeedMomes(props){

  const profile = props.data.searchEditions;

    if(!profile){
      console.log("loading!");
      return (<div>Loading data</div>);
    } else{        
      const moment = profile.searchSummary.data.data
      console.log(moment);
     

        moment.map(moment => {
                let statScore = moment.play.statsPlayerGameScores.points + moment.play.statsPlayerGameScores.rebounds + 
                    moment.play.statsPlayerGameScores.assists + moment.play.statsPlayerGameScores.steals + 
                    moment.play.statsPlayerGameScores.blocks;

                let tripDub = checkTripDub(moment.play.statsPlayerGameScores.points,moment.play.statsPlayerGameScores.rebounds,
                    moment.play.statsPlayerGameScores.assists, moment.play.statsPlayerGameScores.steals, 
                    moment.play.statsPlayerGameScores.blocks)

                let Mome = new Moment({
                    momentUrl: moment.assetPathPrefix + "Hero_2880_2880_Black.jpg?width=200?w=256&q=75",
                    player: moment.play.stats.playerName,
                    teamName: moment.play.stats.teamAtMoment,
                    setName: moment.set.flowName,
                    tier: findSetTier(moment.set.setVisualId),
                    playType: moment.play.stats.playCategory,
                    circulationCount: moment.circulationCount,
                    momentDate: moment.play.stats.dateOfMoment,
                    points: moment.play.statsPlayerGameScores.points,
                    rebounds: moment.play.statsPlayerGameScores.rebounds,
                    assists: moment.play.statsPlayerGameScores.assists,
                    steals: moment.play.statsPlayerGameScores.steals,
                    blocks: moment.play.statsPlayerGameScores.blocks,
                    statScore: statScore,
                    tripDub: tripDub,

                    });
                    
                    try{
                        axios.post('http://localhost:5000/momentseed', {
                          Mome
                        });
                        console.log(Mome.player + ' saved')
                        
                    } catch(e){
                        console.log(e);
                        return (<div>Error: {e}</div>);
                    }                                    
        });

        return (<div>Data Saving</div>);

    }

};


export default graphql(getMomentsMasterQuery, 
  {
    props: ({ sets }) => ({ 
    options: 
      {
          context: 
          {
              headers:
              {
                  "user" : "Jayson Lewis - jayson.lewis5@gmail.com - 918.527.0315"
              }
          },
      
       variables: 
          { input: 
              {
                  "filters":{
                    "bySetIDs": sets
                  }
                } 
          }      
        }    
      })
  })(SeedMomes);