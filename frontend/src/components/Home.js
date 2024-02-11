import React, { useState, useEffect } from 'react'
import "./Home.css";

function Home() {
  const [hiddenValues, setHiddenValues] = useState([]);
  const [isStarted, setStarted] = useState(false);
  const [cardNumber, setCardNumber] = useState([-1, -1]);
  const [foundDiffuse, setFoundDiffuse] = useState(0);
  const [userName, setUserName] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (cardNumber.length === 0) {
      setScore(score+1);
      handleStart();
    }
  }, [cardNumber]);

  function handleStart() {
    setHiddenValues(() => {
      const numbers = [];
      for (let i = 0; i < 5; i++) {
        const randomNumber = Math.floor(Math.random() * 4) + 1;
        numbers.push(randomNumber);
      }
      return numbers;
    })
    setCardNumber([0,1,2,3,4]);
    setStarted(true);
  }

  function removeCard(index){
    setCardNumber(prevState => {
      const newState = [...prevState];
      newState.splice(index, 1); 
      return newState;
    })
    setHiddenValues(prevState => {
      const newState = [...prevState];
      newState.splice(index, 1); 
      return newState;
    })
  }


  if(isStarted){
    function flipCardHandler(index) {
      if(hiddenValues[index] === 3){
        handleStart();
      }
      else if(hiddenValues[index] === 1){
        removeCard(index);
      }
      else if(hiddenValues[index] === 2){
        setFoundDiffuse(foundDiffuse+1);
        removeCard(index);
      }
      else{
        if(foundDiffuse > 0){
          removeCard(index);
          setFoundDiffuse(foundDiffuse-1);
        }
        else{
          console.log("You lose");
          handleStart();
        }
      }
    }
    console.log(hiddenValues);
    return (
      <div className='Home-main'>
        <div className='Home-text-container'>
          <div className='Home-text'><h1><span>{userName} </span>  Click on any Card</h1></div>
          <div className='Home-score-container'>
            <h2>Score : {score}</h2>
          </div>
        </div>
        <div className='Home-card-container'>
        {cardNumber.map((eachcardvalue, flippedIndex) => (
          <div className='cards' key={flippedIndex} onClick={() => flipCardHandler(flippedIndex)}>card {flippedIndex+1}</div>
        ))}
        </div>
      </div>
    )
  }
  
  else{
    function handleUserNameChange(e){
      setUserName(e.target.value);
      console.log(e.target.value);
    }
    return(
      <div className='Home-start-container'>
        <input type='text' placeholder='What should we call you' className='Home-input' onChange={handleUserNameChange}></input>
        <button className='Home-start-button' onClick={handleStart}>Start Game</button>
      </div>
    )
  }
}

export default Home;