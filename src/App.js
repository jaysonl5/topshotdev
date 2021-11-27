
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './App.css';
import './components/UserProfile';
import './components/MomentsMaster';
import { InMemoryCache } from "@apollo/client";
import MomentsMaster from "./components/MomentsMaster";
import SeedMomes from "./components/momentSeed";




function App() {

const client = new ApolloClient({
  uri: 'https://public-api.nbatopshot.com/graphql/',
  cache: new InMemoryCache()
})  

  return(
    <ApolloProvider client={client}>
      <div>
        <h1>Testing Graphql for Topshots!</h1>
        <SeedMomes />
      </div>
    </ApolloProvider>
  );
}

export default App;


