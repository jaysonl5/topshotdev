import GetMomentListings from "./GetMomentListings"
import { ApolloProvider, InMemoryCache } from "@apollo/client";
import { ApolloClient } from "@apollo/client";


const client = new ApolloClient({
    uri: 'https://public-api.nbatopshot.com/graphql/',
    cache: new InMemoryCache()
  }) 

export default function TestListings(props){
    return props.sets.map((set) => (
       <ApolloProvider client={client}>
            <GetMomentListings set={set.setId} />
        </ApolloProvider>
    )
        

    )


}