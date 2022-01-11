import {React, useState, useEffect} from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Pagination from './Pagination/Pagination';

function formatDate(date){
  var d = new Date(date);
  var formattedDate = d.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric'});
  return formattedDate;

}

export default function MomentsMaster(props){

  const [sortCategory, setSortCategory] = useState('player');
  const [moments, setMoments] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(1)
  const [pageNumber, setPageNumber] = useState(0)

  useEffect(() => {
      axios.get(`/moments/` + sortCategory + `?page=${pageNumber}`)
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

    setPageNumber(0);
  }

        if(!moments){
        return(<div>"Loading"</div>);
        } else {        
          console.log(moments);
          console.log("PAGES ARR: " + pages);
        return (
                <div> 
                    <div className='tableContainer'>               
                    <table>
                        <thead style={{position: "sticky", top: "0"}}>
                          <tr>
                            <th>Moment</th>
                            <th onClick={() => {handleSort('player')}}>Player</th>
                            <th onClick={() => {handleSort('teamName')}}>Team Name</th>
                            <th onClick={() => {handleSort('set.flowName')}}>Set Name</th>
                            <th onClick={() => {handleSort('set.tier')}}>Tier</th>
                            <th onClick={() => {handleSort('playType')}}>Play Type</th>
                            <th onClick={() => {handleSort('circulationCount')}}>Circulation Count</th>
                            <th onClick={() => {handleSort('momentDate')}}>Date of Moment</th>
                            <th className="statCol" onClick={() => {handleSort('stats.points')}}>Pts</th>
                            <th className="statCol" onClick={() => {handleSort('stats.rebounds')}}>Reb</th>
                            <th className="statCol" onClick={() => {handleSort('stats.assists')}}>Ast</th>
                            <th className="statCol" onClick={() => {handleSort('stats.steals')}}>Stl</th>
                            <th className="statCol" onClick={() => {handleSort('stats.blocks')}}>Blk</th>
                            <th className="statCol" onClick={() => {handleSort('stats.statScore')}}>Stat Score</th>
                            <th className="statCol" onClick={() => {handleSort('stats.tripDub')}}>Trip Dub</th>
                          </tr>
                        </thead>

                        <tbody>
                        {moments.map(moment => {
                          return(
                            <tr key={moment._id}>
                              <td><img src={moment.momentUrl} width="55px" /></td>
                              <td>{moment.player}</td>
                              <td>{moment.teamName}</td>
                              <td>{moment.set.flowName}</td>
                              <td>{moment.set.tier}</td>
                              <td>{moment.playType}</td>
                              <td>{moment.circulationCount}</td>
                              <td>{formatDate(moment.momentDate)}</td>
                              <td className="statCol">{moment.stats.points}</td>
                              <td className="statCol">{moment.stats.rebounds}</td>
                              <td className="statCol">{moment.stats.assists}</td>
                              <td className="statCol">{moment.stats.steals}</td>
                              <td className="statCol">{moment.stats.blocks}</td>
                              <td className="statCol">{moment.stats.statScore}</td>
                              <td className="statCol">{moment.stats.tripDub}</td>
                              </tr>
                          )
                          
                        })}
                    </tbody>

                        
                    </table>
                    </div>

                    <div>
                      <Pagination pages={pages} numberOfPages={numberOfPages} 
                        pageNumber={pageNumber} setPageNumber={setPageNumber}
                        
                      />
                    </div>
                </div>
        )
}
}
