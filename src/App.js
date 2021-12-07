
import ApolloClient from 'apollo-boost';
import './App.css';
import './components/UserProfile';
import './components/MomentsMaster';
import { ApolloProvider, InMemoryCache } from "@apollo/client";
import {React, useState, useEffect} from 'react';
import axios from 'axios';
import MomentsMaster from './components/MomentsMaster';





function App() {

  // const [sets, setSets] = useState([]);

  // useEffect(() => {

  //     axios.get('http://localhost:5000/getsets')
  //         .then(response => {
  //           setSets(response.data);
  //         })
      


  //     console.log(sets)
  // }, []);


  


const client = new ApolloClient({
  uri: 'https://public-api.nbatopshot.com/graphql/',
  cache: new InMemoryCache()
})  

  return(
    <ApolloProvider client={client} style={{backgroundColor: "black"}}>
      <div style={{backgroundColor: "black"}}>        
          <MomentsMaster />                  
      </div>
    </ApolloProvider>
  );
}

export default App;


