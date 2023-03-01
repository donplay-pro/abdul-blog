import React from "react";

import playerImg from "../resource/player.png";
import '../css/content.css';

const playercard = ({selectedPlayer}) => {

    return (
    <div id = "playerImage">
        <img src={playerImg}/>
        <div id='aboutPlayer'>
            <div id='name'>{selectedPlayer.operatorPlayerName ? selectedPlayer.operatorPlayerName: "N/A"}</div>
            <div id='point'>{selectedPlayer.fantasyPoints ? selectedPlayer.fantasyPoints: "N/A"}</div>
            <div id='pointText'>Points</div>
        </div>
    </div>

    );
}
 
export default playercard;