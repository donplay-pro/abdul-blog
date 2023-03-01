import React, { useState,useEffect} from "react";
import Pagination from "./pagination";

import '../css/content.css';

const Table = ({selectedOptions,setSelectedPlayer}) => {
    const apiBaseUrl = "https://app.aurictouch.com/";

    const [data, setData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [currentRows,setCurrentRows] = useState([]);
    const [pageSize] = useState(10);
    function paginate(pageNumber){ 
        setCurrentPage(pageNumber);
        let indexOfLastRow = currentPage * pageSize;
        let indexOfFirstRow = indexOfLastRow - pageSize;
        setCurrentRows(data.slice(indexOfFirstRow, indexOfLastRow));
    }
    useEffect(()=>{
        if(selectedOptions.operator,selectedOptions.gameType,selectedOptions.slateName){
            (async function getdata(){
                const url = apiBaseUrl+"players?operator="+selectedOptions.operator+"&operatorGameType="+selectedOptions.gameType+"&operatorName="+selectedOptions.slateName;
                fetch(url)
                .then((response) => response.json())
                .then((json) => setData(json.data));
                setLoading(false);
                paginate(1);
            })();
        }
    },[selectedOptions.slateName])

    return (
    <div id="table">
        {data.length > 0 && <Pagination paginate = {paginate} pageNumber ={data.length} pageSize = {pageSize} currentPage = {currentPage}/>}
    <div>
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
              <tr key ={row.playerId} onClick={() => setSelectedPlayer(row)}>
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
    </div>

    );
}
 
export default Table;