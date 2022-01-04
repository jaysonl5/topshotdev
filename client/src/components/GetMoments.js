import { gql, useQuery } from "@apollo/client"
import SeedMoments from './SeedMoments';
import axios from 'axios';
const {Moment} = require('../schema/moment');

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

  const sendPostRequest = async (Mome) => {
    try {
        const resp = await axios.post('http://localhost:5000/momentseed', {
          Mome
        });
        console.log(resp.data);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};

  

export default function GetMoments({ sets }) {

    const setIdArray = [];
    sets.map(set => { 
        setIdArray.push(set.setId);
    })

    console.log(setIdArray);
    
      const { loading, error, data } = useQuery(getMomentsMasterQuery, { 
        variables: { input: 
            {
                "filters":{
                  "bySetIDs": setIdArray
                }
              } 
        }    
      });

      if(loading) return <div>Loading Moments from Sets!</div>;
      if (error) return `Error ${error}`;
      if(data) {
        let moments = data.searchEditions.searchSummary.data.data;
        moments.map(moment => {
          console.log("SeedMoments component call");

          let statScore = moment.play.statsPlayerGameScores.points + moment.play.statsPlayerGameScores.rebounds + 
        moment.play.statsPlayerGameScores.assists + moment.play.statsPlayerGameScores.steals + 
        moment.play.statsPlayerGameScores.blocks;

    let tripDub = checkTripDub(moment.play.statsPlayerGameScores.points,moment.play.statsPlayerGameScores.rebounds,
        moment.play.statsPlayerGameScores.assists, moment.play.statsPlayerGameScores.steals, 
        moment.play.statsPlayerGameScores.blocks)

    let Mome = new Moment({
        playId: moment.play.id,
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

        sendPostRequest(Mome);
          

        })
        
        return(
            <div>
                <p>Calling seed Momes:</p>
                
            </div>
        )
      }

  }