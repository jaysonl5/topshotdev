
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './App.css';
import './components/UserProfile';
import './components/MomentsMaster';
import { InMemoryCache } from "@apollo/client";
import MomentsMaster from "./components/MomentsMaster";
import SeedMomes from "./components/momentSeed";
import SeedSets from "./components/setSeed";
import {React, useState, useEffect} from 'react';
import axios from 'axios';





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
        <SeedMomes sets={sets}/>
      </div>
    </ApolloProvider>
  );
}

export default App;


