
import { request } from "graphql-request";
import { gql } from 'apollo-boost'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './App.css';
import './components/UserProfile';

import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  graphql,
  __Schema,
} from 'graphql';

import { loader } from 'graphql.macro';
import UserProfile from "./components/UserProfile";
import { InMemoryCache } from "@apollo/client";
const schema = loader('../schema.graphql');



function App() {


//   const input = '{'
//     + '"input" : { '
//         + '"username" : "jaysonl"'
//     + '}'
//   + '}';
 

//   const query = gql`
//   {
//     $input : getUserProfileByUsernameInput!) {
//     getUserProfileByUsername(input:$input) {
//       publicInfo {
//         dapperID
//         flowAddress
//         username
//         profileImageUrl
//         twitterHandle
//         createdAt
//         favoriteTeamID
//       }
//       momentCount
//     }
//   }`;

// request( "https://public-api.nbatopshot.com/graphql/", query, input)
//   .then(console.log)
//   .catch(console.error);

const client = new ApolloClient({
  uri: 'https://public-api.nbatopshot.com/graphql/',
  cache: new InMemoryCache()
})  

  return(
    <ApolloProvider client={client}>
      <div>
        <h1>Testing Graphql for Topshots!</h1>
      <UserProfile username={"jaysonl"}/>
      </div>
    </ApolloProvider>
  );
}

export default App;


