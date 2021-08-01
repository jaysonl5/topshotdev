import { request } from "graphql-request";
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo';

const getUserProfileQuery = gql`
query($input: getUserProfileByUsernameInput!){
        getUserProfileByUsername(input:$input) {
          publicInfo {
            dapperID
            flowAddress
            username
            profileImageUrl
            twitterHandle
            createdAt
            favoriteTeamID
          }
          momentCount
        }
    }`


function Profile(props){
    const profile = props.data.getUserProfileByUsername;
    console.log(props.data.getUserProfileByUsername);

    if(!profile){
        return(
            <div>
                <h3>LOADING...</h3>
            </div>
        )
    } else {
        return (
                <div>
                    <h2>{profile.publicInfo.username} <img src={profile.publicInfo.profileImageUrl} width="40px;"/></h2>
                    <ul id="profile">
                        <li>User ID: {profile.publicInfo.dapperID}</li>
                        <li>Moment Count: {profile.momentCount}</li>
                        
                    </ul>
                </div>
        )
    }

};

// export default graphql(getUserProfileQuery)(Profile);
export default graphql(getUserProfileQuery, 
    { options: 
        {
            context: 
            {
                headers:
                {
                    "user" : "Jayson Lewis - jayson.lewis5@gmail.com - 918.527.0315"
                }
            },
        
         variables: 
            { input: 
                {
                    "username" : "jaysonl"
                } 
            }          
        }
    })(Profile);