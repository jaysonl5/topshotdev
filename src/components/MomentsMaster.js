import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo';


function findSetTier(setVisualId){
    switch(setVisualId){
        case "SET_VISUAL_LEGENDARY":
            return "Legendary"
        case "SET_VISUAL_RARE":
            return "Rare"
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


function Moments(props){
    const profile = props.data.searchEditions;

    if(!profile){
        return(
            <div>
                <h3>LOADING...</h3>
            </div>
        )
    } else {
        const moment = profile.searchSummary.data.data

        const rows = moment.map(moment => {
            return(
            <tr key={moment.id}>
                <td><img src={moment.assetPathPrefix + "Hero_2880_2880_Black.jpg?width=200?w=256&q=75"} width="95px" /></td>
                <td>{moment.play.stats.playerName}</td>
                <td>{moment.play.stats.teamAtMoment}</td>
                <td>{moment.set.flowName}</td> 
                <td>{findSetTier(moment.set.setVisualId)}</td>
            </tr>)
        });
        console.log(moment)
        return (
                <div>
                    <h2>Moments:</h2>
                    {/* <h2>{profile.publicInfo.username} <img src={profile.publicInfo.profileImageUrl} width="40px;"/></h2> */}
                    <table>
                        <thead>
                            <td>Moment</td>
                            <td>Player</td>
                            <td>Team Name</td>
                            <td>Set Name</td>
                            <td>Tier</td>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
        )
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
    })(Moments);