import {React, useState, useEffect} from 'react';
import axios from 'axios';
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
                            <th onClick={() => {handleSort('set.flowName')}}>Set Name</th>
                            <th onClick={() => {handleSort('set.tier')}}>Tier</th>
                            {/* <th onClick={() => {handleSort('playType')}}>Play Type</th> */}
                            {/* <th onClick={() => {handleSort('circulationCount')}}>Circulation</th> */}
                            <th onClick={() => {handleSort('momentDate')}}>Date of Moment</th>
                            <th className="statCol" onClick={() => {handleSort('stats.points')}}>Pts</th>
                            <th className="statCol" onClick={() => {handleSort('stats.rebounds')}}>Reb</th>
                            <th className="statCol" onClick={() => {handleSort('stats.assists')}}>Ast</th>
                            <th className="statCol" onClick={() => {handleSort('stats.steals')}}>Stl</th>
                            <th className="statCol" onClick={() => {handleSort('stats.blocks')}}>Blk</th>
                            <th className="statCol" onClick={() => {handleSort('stats.statScore')}}>MomeScore</th>
                            <th className="statCol" onClick={() => {handleSort('stats.tripDub')}}>Trip Dub</th>
                          </tr>
                        </thead>

                        <tbody>
                        {moments.map(moment => {

                          let scoreColor = "white"
                          if(moment.stats.statScore > 35){
                            scoreColor = "#56E39F"
                          } else if (moment.stats.statScore < 35 && moment.stats.statScore > 20) {
                            scoreColor = "darkorange"
                          } else {
                            scoreColor = "#FF6F59"
                          }

                          let tierColor = "white"
                          switch (moment.set.tier){
                            case "Legendary":
                              tierColor = "HotPink"
                              break;
                            case "Common":
                              tierColor = "white"
                              break;
                            case "Rare":
                              tierColor = "Gold"
                              break;
                            case "Fandom":
                              tierColor = "Aqua"
                              break;
                            default:
                              tierColor = "white"
                          }
                            

                          return(
                            <tr style={{color: tierColor}} key={moment._id}>
                              <td><img src={moment.momentUrl} width="65px" /></td>
                              <td className="playerCol" style={{ display: "block"}}> 
                                <img className="teamLogo" src={`https://cdn.nba.com/logos/nba/${moment.teamId}/primary/L/logo.svg`} style={{width:"35px"}}/>
                                &nbsp;
                                <span className='playerName' style={{fontWeight:"bolder", color: "whitesmoke"}}>{moment.player}</span>
                                  <br />
                                  <span className="playType" style={{fontSize: ".8rem"}}>{moment.playType}
                                  &nbsp; | &nbsp; 
                                  {moment.circulationCount}</span>
                              </td>
                              <td>{moment.set.flowName}</td>
                              <td>{moment.set.tier}</td>
                              {/* <td>{moment.playType}</td> */}
                              {/* <td>{moment.circulationCount}</td> */}
                              <td style={{fontSize:".9rem"}}>{formatDate(moment.momentDate)}</td>
                              <td className="statCol">{moment.stats.points}</td>
                              <td className="statCol">{moment.stats.rebounds}</td>
                              <td className="statCol">{moment.stats.assists}</td>
                              <td className="statCol">{moment.stats.steals}</td>
                              <td className="statCol">{moment.stats.blocks}</td>
                              <td className="statCol" style={{color: scoreColor, fontWeight: 'bolder'}}>
                                <span style={{backgroundColor: "#5b6c5d7e", padding: '10px', border: '1px dashed #ADF1D2'}}>
                                  {moment.stats.statScore}
                                </span>
                              </td>
                                
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
