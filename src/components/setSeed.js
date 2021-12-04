import axios from 'axios';
const { gql } = require('@apollo/client');
const { graphql, useQuery } = require('react-apollo');
require('dotenv').config();
const { Set } = require('../schema/set');


// const sets = ["814c5183-596f-41d7-9135-c6b29faa9c6d", "122b048d-585e-4c63-8275-c23949576fd6" ,"708a6f60-5c93-406e-854f-50dd6734c0dd"];

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

const getSetSeedQuery = gql`
query($input:SearchSetsInput!){
    searchSets(input: $input){
      searchSummary{
        data{
          data{
            sortID
            ... on Set
            {
              id,
              flowId,
              flowName,
              flowSeriesNumber,
              assetPath,
              setVisualId
            }
          }
        },
        pagination {
          leftCursor
        },
        count{
          count
        }
      }
    }
  }`


 

function SeedSets(props){

  const profile = props.data.searchSets;

    if(!profile){
      console.log("loading!");
      return (<div>Loading data</div>);
    } else{        
      console.log(props.data.searchSets);
      let data = props.data.searchSets.searchSummary.data.data;

        data.map(data => {

          let setTier = findSetTier(data.setVisualId);

                let NewSet = new Set({
                  setId: data.id,
                  flowId: data.flowId,
                  setName: data.flowName,
                  seriesNumber: data.flowSeriesNumber,
                  assetPath: data.assetPath,
                  setVisualID: setTier
                    });
                    
                    try{
                        axios.post('http://localhost:5000/setseed', {
                          NewSet
                        });
                        console.log(NewSet.setName + ' saved')
                        
                    } catch(e){
                        console.log(e);
                        return (<div>Error: {e}</div>);
                    }    
                    
           return (<div>Data Saving</div>);
        });

        

    }

};


export default graphql(getSetSeedQuery, 
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
                    "byLeagues": ["NBA"]
                  },
                  "searchInput": {
                      "pagination": {
                      "cursor": "",
                      "direction": "RIGHT",
                      "limit": 5000
                    }
                  }
              } 
          }          
      }
  })(SeedSets);