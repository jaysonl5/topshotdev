
import ApolloClient from 'apollo-boost';
import './App.css';
import './components/UserProfile';
import './components/MomentsMaster';
import { ApolloProvider, InMemoryCache } from "@apollo/client";
import MomentsMaster from "./components/MomentsMaster";
import SeedMoments from "./components/SeedMoments";
import SeedSets from "./components/setSeed";
import {React, useState, useEffect} from 'react';
import axios from 'axios';
import GetMoments from './components/GetMoments';





function App() {

  const [sets, setSets] = useState([]);

  useEffect(() => {

      axios.get('http://localhost:5000/getsets')
          .then(response => {
            setSets(response.data);
          })
      


      console.log(sets)
  }, []);


  


const client = new ApolloClient({
  uri: 'https://public-api.nbatopshot.com/graphql/',
  cache: new InMemoryCache()
})  

  return(
    <ApolloProvider client={client}>
      <div>
        <h1>Testing Graphql for Topshots!</h1>
        {sets.length > 0 ? 
          <GetMoments sets={sets}/>
          : <div>Loading</div>          
        }
           
      </div>
    </ApolloProvider>
  );
}

export default App;


