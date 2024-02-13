import React, { useState, useEffect } from 'react'
import "./Home.css";
// import store from '../app/store';
import {useDispatch} from 'react-redux';
import { addScore, setuserName } from '../app/actions';
import axios from "axios";


function Home() {
  const [score, setScore] = useState(0);
  const [hiddenValues, setHiddenValues] = useState([]);
  const [isStarted, setStarted] = useState(false);
  const [cardNumber, setCardNumber] = useState([-1, -1]);
  const [foundDiffuse, setFoundDiffuse] = useState(0);
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    handleCommunication();
  }, [score]);
  
  useEffect(() => {
    if (cardNumber.length === 0) {
      setScore(prevScore => prevScore+1)
      handleStart();
    }
  }, [cardNumber]);


  async function handleCommunication(){
    await axios.post("http://127.0.0.1:4000/updatescore", {score, userName})
    .then(res => {
      if(res.data.message === "User not found"){
        alert("Some error occured!");}
      else{
        console.log("from backend   ", res.data);
      }
    })
  }
  
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
    setFoundDiffuse(0);
    dispatch(addScore(score));
    dispatch(setuserName(userName));
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
      if(hiddenValues[index] === 3 || hiddenValues[index] === 2){
        setFoundDiffuse(foundDiffuse+1);
        removeCard(index);
      }
      else if(hiddenValues[index] === 1){
        removeCard(index);
      }
      // else if(hiddenValues[index] === 2){
      //   setFoundDiffuse(foundDiffuse+1);
      //   removeCard(index);
      // }
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