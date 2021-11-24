import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo';
const mongoose = require('mongoose');
require('dotenv').config();
const {Moment} = require('./schema/moment.js');


function findSetTier(setVisualId){
    switch(setVisualId){
        case "SET_VISUAL_LEGENDARY":
            return "Legendary"
        case "SET_VISUAL_RARE":
            return "Rare"
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

function seedMomes(props){
    const profile = props.data.searchEditions;

    if(!profile){
        return(
            <div>
                <h3>LOADING...</h3>
            </div>
        )
    } else {
        const moment = profile.searchSummary.data.data


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
                    badges: [
                        {
                            badgeName: '',
                            badgeImageUrl:  ''
                        }]
                    });

                    try{
                        await Mome.save();
                        console.log(Mome.player + ' saved')
                    } catch(e){
                        console.log(e);
                        return (<div>error!</div>)
                    }

                    res.json({Mome})
                    

        });


    }

};

// export default graphql(getUserProfileQuery)(Profile);
export default graphql(getMomentsMasterQuery, 
    { options: 
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
                      "bySetIDs": ["814c5183-596f-41d7-9135-c6b29faa9c6d", "122b048d-585e-4c63-8275-c23949576fd6" ,"708a6f60-5c93-406e-854f-50dd6734c0dd"]
                    }
                  } 
            }          
        }
    })(seedMomes);