


import {React, useState, useEffect} from 'react';
import axios from "axios";
import TestListings from './TestListings'
import SeedSets from './SeedSets'
import { ApolloProvider, InMemoryCache } from "@apollo/client";
import { ApolloClient } from "@apollo/client"; 


export default function Admin(props){

  const [sets, setSets] = useState([]);
  const [seedMome, setSeedMome] = useState(false);
  const [startGetSets, setstartGetSets] = useState(false);

  

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
      setSeedMome(true);      
      console.log('true')
    }

  }

    return(
        <div>
        <div>
            <button onClick={handleGetSets}>Seed Sets</button>
            <button onClick={handleGetMomentListings}>Seed Moment Listings</button>
        </div>
        { startGetSets ? <SeedSets /> : null }   
        { seedMome ?
          <TestListings sets={sets} />

         : null }
         
        </div>
    )

}