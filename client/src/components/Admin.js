

import { ApolloProvider, InMemoryCache } from "@apollo/client";
import {React, useState, useEffect} from 'react';
import axios from "axios";
import { ApolloClient } from "@apollo/client";
import GetMomentListings from './GetMomentListings'
import SeedSets from './SeedSets'
import { set } from "mongoose";


export default function Admin(props){

    
  const [sets, setSets] = useState([]);
  const [seedMome, setSeedMome] = useState(false);
  const [startGetSets, setstartGetSets] = useState(false);
  const [currentSet, setCurrentSet] = useState('');


  const client = new ApolloClient({
    uri: 'https://public-api.nbatopshot.com/graphql/',
    cache: new InMemoryCache()
  })  


  function handleGetSets(e){
    e.preventDefault();
    axios.get('/getsets')
    .then(response => {
      setSets(response.data);
    })
  }

  function handleGetMomentListings(e){
    e.preventDefault();  
    
    if(sets.length > 0){
      setCurrentSet(sets[0].setId)
      setSeedMome(true);      
    }

    console.log(currentSet);
  }

    return(
        <div>
        <div>
            <button onClick={handleGetSets}>Seed Sets</button>
            <button onClick={handleGetMomentListings}>Seed Moment Listings</button>
        </div>
        { startGetSets ? <SeedSets /> : null }   
        { seedMome ?
        <ApolloProvider client={client}>
          <h2>GET MOMES</h2>

          <GetMomentListings set={currentSet} />
        </ApolloProvider> : null }
        </div>
    )

}