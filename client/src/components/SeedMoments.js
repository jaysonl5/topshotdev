import axios from 'axios';
require('dotenv').config();
const {React} = require('react');

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

export default function SeedMoments(props){

  if(!props.moment){
    return (<div>Loading data</div>);
  } else {
    console.log("SEEMOME MOME: " + props.moment)
    let statScore = props.moment.play.statsPlayerGameScores.points + props.moment.play.statsPlayerGameScores.rebounds + 
        props.moment.play.statsPlayerGameScores.assists + props.moment.play.statsPlayerGameScores.steals + 
        props.moment.play.statsPlayerGameScores.blocks;

    let tripDub = checkTripDub(props.moment.play.statsPlayerGameScores.points,props.moment.play.statsPlayerGameScores.rebounds,
        props.moment.play.statsPlayerGameScores.assists, props.moment.play.statsPlayerGameScores.steals, 
        props.moment.play.statsPlayerGameScores.blocks)

    let Mome = {
        momentId: props.moment.id,
        playId: props.moment.play.id,
        momentUrl: props.moment.assetPathPrefix + "Hero_2880_2880_Black.jpg?width=200?w=256&q=75",
        player: props.moment.play.stats.playerName,
        teamName: props.moment.play.stats.teamAtMoment,
        setName: props.moment.set.flowName,
        tier: findSetTier(props.moment.set.setVisualId),
        playType: props.moment.play.stats.playCategory,
        circulationCount: props.moment.circulationCount,
        momentDate: props.moment.play.stats.dateOfMoment,
        points: props.moment.play.statsPlayerGameScores.points,
        rebounds: props.moment.play.statsPlayerGameScores.rebounds,
        assists: props.moment.play.statsPlayerGameScores.assists,
        steals: props.moment.play.statsPlayerGameScores.steals,
        blocks: props.moment.play.statsPlayerGameScores.blocks,
        statScore: statScore,
        tripDub: tripDub,

        };

      try{
          axios.post('http://localhost:5000/momentseed', {
            Mome
          });
          console.log(Mome.player + ' saved')
          
          return(<div>Saving...</div>)
          
      } catch(e){
          console.log(e);
          return (<div>Error: {e}</div>);
      } 
  }
};