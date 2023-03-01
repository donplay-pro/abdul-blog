import React, { useState,useEffect} from "react";
import './css/content.css';
import Table from "./components/table";
import PlayerCard from "./components/playercard";
import Selection from "./components/selection";

const Content = () => {
    const apiBaseUrl = "https://app.aurictouch.com/";
    const [operatorOptions, setOperatorOptions] = useState([]);
    const [gameTypeOptions, setGameTypeOptions] = useState([]);
    const [slateNameOptions, setSlateNameOptions] = useState([]);

    const [selectedOptions, setSelectedOptions] = useState({operator:"",gameType:"",slateName:""});
    const [selectedPlayer , setSelectedPlayer] = useState({});


    useEffect(() => {
        (async function getData(){
        fetch(apiBaseUrl+"operator")
        .then((response) => response.json())
        .then((json) => setOperatorOptions(json.data));})();
    },[]);


    const handleSelectOperator=(value)=> {
        setSelectedOptions({...selectedOptions,operator:value,gameType:"",slateName:""});
        fetch(apiBaseUrl+"operatorGameType?operator=" + value)
        .then((response) => response.json())
        .then((json) => setGameTypeOptions(json.data));
    }

    const handleGameType = (value)=> {
        setSelectedOptions({...selectedOptions,gameType:value,slateName:""});
        fetch(apiBaseUrl+"operatorName?operator=" + selectedOptions.operator + 
        "&operatorGameType=" + value)
        .then((response) => response.json())
        .then((json) => setSlateNameOptions(json.data));
    }

    const handleSlateName = (value)=>{
        setSelectedOptions({...selectedOptions,slateName:value});
    }

    return (
        <div>
            <div id = "selectOptions">
                <Selection operator={operatorOptions} defaultOption="Select Operator" onValueChange={handleSelectOperator} />
                <Selection operator={gameTypeOptions} defaultOption="Select Game Type" onValueChange={handleGameType} />
                <Selection operator={slateNameOptions} defaultOption="Select Slate Option" onValueChange={handleSlateName}/>
            </div>
            <Table selectedOptions={selectedOptions} setSelectedPlayer={setSelectedPlayer}/>
            <PlayerCard selectedPlayer={selectedPlayer}/>
        </div>
    );
}
 
export default Content;