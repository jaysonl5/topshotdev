import {React, useState, useEffect} from 'react';
import axios from 'axios';




export default function MomentsMaster(props){

  const [sortCategory, setSortCategory] = useState('player');
  const [moments, setMoments] = useState([]);
  
  useEffect(() => {
      axios.get('http://localhost:5000/moments/' + sortCategory)
          .then(response => {
            setMoments(response.data);
          })        
  }, [sortCategory]);

  function handleSort(category){
    sortCategory === category ? 
    setSortCategory('-' + category)
    :
    setSortCategory(category);
  }

        if(!moments){
        return(<div>"Loading"</div>);
        } else {        
          console.log(moments);
        return (
                <div style={{backgroundColor: "black", color: "white"}}>
                    <h2>Moments:</h2>                  
                    <table className="momentMaster">
                        <thead>
                            <th>Moment</th>
                            <th onClick={() => {handleSort('player')}}>Player</th>
                            <th onClick={() => {handleSort('teamName')}}>Team Name</th>
                            <th>Set Name</th>
                            <th>Tier</th>
                            <th>Play Type</th>
                            <th>Circulation Count</th>
                            <th>Date of Moment</th>
                            <th>Pts</th>
                            <th>Reb</th>
                            <th>Ast</th>
                            <th>Stl</th>
                            <th>Blk</th>
                            <th>Stat Score</th>
                            <th>TD</th>                            
                        </thead>

                        <tbody>
                        {moments.map(moment => {
                          
                          return(
                            <tr key={moment._id}>
                              <td><img src={moment.momentUrl} width="180px" /></td>
                              <td>{moment.player}</td>
                              <td>{moment.teamName}</td>
                              <td>{moment.setName}</td>
                              <td>{moment.tier}</td>
                              <td>{moment.playType}</td>
                              <td>{moment.circulationCount}</td>
                              <td>{moment.momentDate}</td>
                              <td>{moment.points}</td>
                              <td>{moment.rebounds}</td>
                              <td>{moment.assists}</td>
                              <td>{moment.steals}</td>
                              <td>{moment.blocks}</td>
                              <td>{moment.statScore}</td>

                              </tr>
                          )
                          
                        })}
                    </tbody>

                        
                    </table>
                </div>
        )
}
}
