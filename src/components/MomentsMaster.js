import {React, useState, useEffect} from 'react';
import axios from 'axios';

function formatDate(date){
  var d = new Date(date);
  var formattedDate = d.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric'});
  return formattedDate;

}

export default function MomentsMaster(props){

  const [sortCategory, setSortCategory] = useState('player');
  const [moments, setMoments] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(0)

  useEffect(() => {
      axios.get(`http://localhost:5000/moments/` + sortCategory + `?page=${pageNumber}`)
          .then(response => response.data)
          .then(({totalPages, moments}) => {
            console.log("TOTAL PAGES! " + totalPages)
            setNumberOfPages(totalPages);
            setMoments(moments);
          })        
  }, [sortCategory, pageNumber]);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

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
          console.log("PAGES ARR: " + pages);
        return (
                <div style={{width: "100%", backgroundColor: "black", color: "white"}}>
                    <h2>Moments:</h2>                  
                    <table className="momentMaster">
                        <thead>
                            <th>Moment</th>
                            <th onClick={() => {handleSort('player')}}>Player</th>
                            <th onClick={() => {handleSort('teamName')}}>Team Name</th>
                            <th onClick={() => {handleSort('setName')}}>Set Name</th>
                            <th onClick={() => {handleSort('tier')}}>Tier</th>
                            <th onClick={() => {handleSort('playType')}}>Play Type</th>
                            <th onClick={() => {handleSort('circulationCount')}}>Circulation Count</th>
                            <th onClick={() => {handleSort('momentDate')}}>Date of Moment</th>
                            <th onClick={() => {handleSort('points')}}>Pts</th>
                            <th onClick={() => {handleSort('rebounds')}}>Reb</th>
                            <th onClick={() => {handleSort('assists')}}>Ast</th>
                            <th onClick={() => {handleSort('steals')}}>Stl</th>
                            <th onClick={() => {handleSort('blocks')}}>Blk</th>
                            <th onClick={() => {handleSort('statScore')}}>Stat Score</th>
                            <th>TD</th>                            
                        </thead>

                        <tbody>
                        {moments.map(moment => {
                          return(
                            <tr key={moment._id}>
                              <td><img src={moment.momentUrl} width="140px" /></td>
                              <td>{moment.player}</td>
                              <td>{moment.teamName}</td>
                              <td>{moment.setName}</td>
                              <td>{moment.tier}</td>
                              <td>{moment.playType}</td>
                              <td>{moment.circulationCount}</td>
                              <td>{formatDate(moment.momentDate)}</td>
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

                    <div>
                    {pages.map(pageIndex => {
                      return(
                      <button className="pageBtn" onClick={() => setPageNumber(pageIndex)}>{pageIndex + 1}</button>
                      )
                    })}
                    </div>
                </div>
        )
}
}
