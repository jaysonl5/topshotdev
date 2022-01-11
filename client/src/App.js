
import ApolloClient from 'apollo-boost';
import './App.css';
import './components/UserProfile';
import './components/MomentsMaster';
import { ApolloProvider, InMemoryCache } from "@apollo/client";
import { React } from 'react';
import MomentsMaster from './components/MomentsMaster';


function App() {

  return(
    <div>
      <div className='brand'></div>
      <div className='container'>        
          <MomentsMaster />                  
      </div>
    </div>
  );
}

export default App;


