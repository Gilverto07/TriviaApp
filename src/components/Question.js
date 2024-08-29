import React from "react"
import {useState} from "react"

export default function Question(props) {
    var he = require('he');

    const [optionsArray, setOptionsArray] = useState(() =>{
        const shuffledArray = [...props.incorrectAnswers]
        const randomIndex = Math.floor(Math.random() * 3)
        shuffledArray.splice(randomIndex, 0, props.correctAnswer)
        return shuffledArray
    })


    return (
        <div className="question">
            <h3>{props.questionNumber + 1}. {he.decode(props.question)}</h3>
            <ul className="options">
                {optionsArray.map((option, i) => (
                    <li key={i} className={
                        props.showScore 
                            ? option === props.correctAnswer 
                                ? 'correct-answer'
                                : option === props.selectedOption
                                ? 'incorrect-answer'
                                : ''
                            : ''
                    }>
                        <input
                            type="radio"
                            id={`option${props.questionNumber + 1}.${i + 1}`}
                            name={`option${props.questionNumber}`}
                            value={he.decode(option)}
                            checked={props.selectedOption === option}
                            onChange={() => props.handleOptionChange(props.questionNumber, option, props.correctAnswer)}
                            disabled={props.disabled}
                        />
                        <label htmlFor={`option${props.questionNumber + 1}.${i + 1}`}>
                            {he.decode(option)}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}