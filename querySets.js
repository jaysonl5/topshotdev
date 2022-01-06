  
const axios = require('axios')
const saveSets = require('./saveSets')

const querySets = async () => {
  var data = JSON.stringify({
    query: `query($input:SearchSetsInput!){
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
    }`,
    variables: {"input":{"filters":{"byLeagues":["NBA"]},"searchInput":{"pagination":{"cursor":"","direction":"RIGHT","limit":500000}}}}
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
  .then(async (response) => {
      if(response.data){
          try{
          await saveSets.saveSets(response.data);          
          } catch(e){
              console.log(e)
          }        
      }

  })
  .catch(function (error) {
    console.log(error);
  })
}

exports.querySets = querySets