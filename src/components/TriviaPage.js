import React from "react";
import {useEffect, useState} from "react"
import Question from "./Question.js" 

export default function TriviaPage(props){

    const [selectedOption, setSelectedOption] = useState({})
    const [answersObject, setAnswersObject] = useState({})
    const [showScore, setShowScore] = useState(false)
    
    const allAnswered = Object.keys(selectedOption).length === props.questions.length
    const answersArray = Object.values(answersObject)

    const count = answersArray.filter((index) => index === true).length
   
    const handleOptionChange = (questionNumber, selectedOption, correctAnswer) =>{
        setSelectedOption((prevState) => ({
            ...prevState,
            [questionNumber]: selectedOption
        }))

        setAnswersObject((prevState) => ({
            ...prevState,
            [questionNumber]: selectedOption === correctAnswer
        }))
    }

    const resetTrivia = () =>{
        setSelectedOption({})
        setAnswersObject({})
        setShowScore(false)
        props.fetchNewQuestions()
    }

    const showResults = () => {
        showScore ? resetTrivia() : setShowScore(true)
    }


    const questionElements = props.questions.map((question, index) =>{

        return <Question key={index} 
            correctAnswer={question.correct_answer}
            incorrectAnswers={question.incorrect_answers} 
            question={question.question}
            questionNumber={index}
            selectedOption={selectedOption[index]}
            handleOptionChange={handleOptionChange}
            disabled={showScore}
            showScore={showScore}/>
    })
    
    return(
        <div>
            {questionElements}
            <button className="triviaPage-button" disabled={!allAnswered} onClick={showResults}>
                {showScore ? "Play Again" : "Show Score"}
            </button>
            {showScore ? <p className="results">You got {count}/{props.questions.length}!</p> : undefined}
        </div>
    )
}

