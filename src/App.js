import React, { useEffect, useState } from "react"
import FrontPage from "./components/FrontPage"
import TriviaPage from "./components/TriviaPage"

function App() {

  const [frontPage, setFrontPage] = useState(true)
  const [questions, setQuestions] = useState([])

    // useEffect(() =>{
    //     const fetchQuestions = async () =>{
    //         try{
    //             const res = await fetch("https://opentdb.com/api.php?amount=5&category=15&difficulty=medium&type=multiple")
    //             const data = await res.json()
    //             setQuestions(data.results)
    //         }catch(error){
    //             console.log("Error fetching data: ", error)
    //         }
    //     }
    //     fetchQuestions()
    // },[])

    const fetchQuestions = async () =>{
      try{
        setQuestions([])
        const res = await fetch("https://opentdb.com/api.php?amount=5&category=15&difficulty=medium&type=multiple")
        const data = await res.json()
        setQuestions(data.results)
      }catch(err){
        console.log("Error fetching data: ", err)
      }
    }

    useEffect(() =>{
      fetchQuestions()
    },[])

  const triviaPage = () =>{
    setFrontPage(prevState => !prevState)
  }
  
  return (
    <div>
      {frontPage && <FrontPage func={() => triviaPage()}/>}
      <div className={!frontPage ? "trivia-container" : undefined}>
        {!frontPage && <TriviaPage questions={questions} fetchNewQuestions={fetchQuestions}/>}
      </div>
    </div>
  );
  
}

export default App;
