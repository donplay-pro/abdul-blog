import React, { useState,useEffect} from "react";

import playerImg from "./resource/player.png";
import './css/content.css';

const Content = () => {
    const apiBaseUrl = "https://app.aurictouch.com/";
    const pageSize = 12;
    const [operatorOptions, setOperatorOptions] = useState([]);
    const [gameTypeOptions, setGameTypeOptions] = useState([]);
    const [slateNameOptions, setSlateNameOptions] = useState([]);

    const [selectedOperatorOption, setSelectedOperatorOption] = useState("");
    const [selectedGameTypeOption, setSelectedGameTypeOption] = useState("");
    const [selectedSlateNameOption, setSelectedSlateNameOption] = useState("");

    const [playerName, setPlayerName] = useState("");
    const [playerPoints, setPlayerPoints] = useState("");

    const [data, setData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [currentRows,setCurrentRows] = useState([]);
    async function paginate(pageNumber){ 
        setCurrentPage(pageNumber);
        let indexOfLastRow = currentPage * pageSize;
        let indexOfFirstRow = indexOfLastRow - pageSize;
        setCurrentRows(data.slice(indexOfFirstRow, indexOfLastRow));
    }

    useEffect(() => {
        (async function getData(){
        fetch(apiBaseUrl+"operator")
        .then((response) => response.json())
        .then((json) => setOperatorOptions(json.data));})();
    },[]);

    useEffect(()=>{
        if(selectedOperatorOption,selectedGameTypeOption,selectedSlateNameOption){
            (async function getdata(){
                const url = apiBaseUrl+"players?operator="+selectedOperatorOption+"&operatorGameType="+selectedGameTypeOption+"&operatorName="+selectedSlateNameOption;
                fetch(url)
                .then((response) => response.json())
                .then((json) => setData(json.data));
                setLoading(false);
                paginate(1);
            })();
        }
    },[selectedSlateNameOption])

    async function handleSelectOperator(e) {
        setSelectedOperatorOption(e.target.value);
        fetch(apiBaseUrl+"operatorGameType?operator=" + e.target.value)
        .then((response) => response.json())
        .then((json) => setGameTypeOptions(json.data));
    }

    async function handleGameType(e) {
        setSelectedGameTypeOption(e.target.value);
        fetch(apiBaseUrl+"operatorName?operator=" + selectedOperatorOption + 
        "&operatorGameType=" + e.target.value)
        .then((response) => response.json())
        .then((json) => setSlateNameOptions(json.data));
    }

    async function handleSlateName(e){
        setSelectedSlateNameOption(e.target.value);
    }

    function handleRowClick(e) {
        console.log(e);
        setPlayerName(e.operatorPlayerName)
        setPlayerPoints(e.fantasyPoints)
    }

    return (
    <div>
    <div id='selection'>
        <select value = {selectedOperatorOption} onChange={handleSelectOperator}>
        <option value="">Select Operator</option>
        {operatorOptions.map((item,index) => (
          <option index = {index+item} value={item}>{item}</option>
        ))}
        </select>

        <select onChange={handleGameType}>
            <option>Select Game Type</option>
            {
                gameTypeOptions.map((item,index) => (
                    <option index = {index+item} value={item}>{item}</option>
                ))
            }
        </select>

        <select onChange={handleSlateName}>
            <option>Select Slate Name</option>
            {
                slateNameOptions.map((item,index) => (
                    <option index = {index+item} value={item}>{item}</option>
                ))
            }
        </select>
    </div>
    <div id="table">
    <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Team</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td>Loading...</td>
            </tr>
          ) : (
            currentRows.map((row) => (
              <tr key ={row.playerId} onClick={() => handleRowClick(row)}>
                <td>{row.operatorPlayerName?row.operatorPlayerName:"N/A"}</td>
                <td>{row.team?row.team:"N/A"}</td>
                <td>{row.operatorPosition?row.operatorPosition:"N/A"}</td>
                <td>{row.operatorSalary?row.operatorSalary:"N/A"}</td>
                <td>{row.fantasyPoints?row.fantasyPoints:"N/A"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    <div id = "playerImage">
        <img src={playerImg} style={playerName ? {}: {display: "none"}}/>
        <div id='aboutPlayer' style={playerName ? {}: {display: "none"}}>
            <div id='name'>{playerName}</div>
            <div id='point'>{playerPoints ? playerPoints: "N/A"}</div>
            <div id='pointText'>Points</div>
        </div>
    </div>
    <div id="pagination">
      <button id="backward" disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>
        Previous
      </button>
      {currentPage}
      <button id = "forward" disabled={currentPage === Math.ceil(data.length / pageSize)} onClick={() => paginate(currentPage + 1)}>
        Next
      </button>
    </div>
    </div>

    );
}
 
export default Content;