import React from "react";

export default function FrontPage(props){
    return(
        <div className="front-page">
            <h1>Trivia!</h1>
            <h3>Press the Button to Start</h3>
            <button onClick={props.func}>Start</button>
        </div>
    )
}