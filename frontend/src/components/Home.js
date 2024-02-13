import React, { useState, useEffect } from 'react'
import "./Home.css";
import {useDispatch} from 'react-redux';
import { addScore, setuserName } from '../app/actions';
import axios from "axios";
import cat from "./../images/cat.svg";
import bomb from "./../images/bomb.svg";
import diffuse from "./../images/wire cutter.png";
import shuffle from "./../images/cards.svg";


function Home() {
  const [score, setScore] = useState(0);
  const [hiddenValues, setHiddenValues] = useState([]);
  const [isStarted, setStarted] = useState(false);
  const [cardNumber, setCardNumber] = useState([-1, -1]);
  const [foundDiffuse, setFoundDiffuse] = useState(0);
  const [userName, setUserName] = useState("");
  const [bigData, setBigData] = useState([]);
  const dispatch = useDispatch();

  const imagesOrganiser = [cat, diffuse, shuffle, bomb];

  useEffect(() => {
    handleCommunication();
  }, [score]);

  useEffect(() => {
    const interval = setInterval(() => {
      leaderBoardData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    if (cardNumber.length === 0) {
      setScore(prevScore => prevScore+1)
      handleStart();
    }
  }, [cardNumber]);

  async function leaderBoardData(){
    await axios.get("http://127.0.0.1:4000/getall")
    .then(res => {
      if(res.data.message === 404){
        alert("no data found");
      }
      else{
        setBigData(res.data);
      }
    })
  }


  async function handleCommunication(){
    await axios.post("http://127.0.0.1:4000/updatescore", {score, userName})
    .then(res => {
      if(res.data.message === "User not found"){
        alert("Some error occured!");}
      else{
        console.log("from backend   ", res.data);
        leaderBoardData();

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
      setTimeout(() => {
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
      }, 1000);
    }

    function handleflippedvalue(index){
      console.log("index in handleflippedvalue   ",index);
      if(cardNumber[index] === 1){
        return cat;
      }
      else if(cardNumber[index] === 2){
        return diffuse;
      }
      else if(cardNumber[index] === 3){
        return shuffle;
      }
      else{
        return bomb;
      }
    }

    console.log(hiddenValues);
    return (
      <div className='Home-main'>
        <div className='Home-cards-main'>
          <div className='Home-text-container'>
            <div className='Home-text'><h1><span>{userName} </span>  Click on any Card</h1></div>
            <div className='Home-score-container'>
              <h2>Score : {score}</h2>
            </div>
          </div>
          <div className='Home-card-container'>
          {cardNumber.map((eachcardvalue, flippedIndex) => (
          <div className='Each-card-container' key={flippedIndex}>
            <div className="cards" key={flippedIndex} onClick={() => flipCardHandler(flippedIndex)}>
              <div className="front">{`card ${flippedIndex+1}`}</div>
              <div className="back">
                <img className="Home-image" src={imagesOrganiser[hiddenValues[flippedIndex]]} alt='catgame'/>
              </div>
            </div>
          </div>
      ))}
          </div>
        </div>
        <div className='Home-leaderboard'>
        <div className='leadplayerbox'><b>Rank</b><span></span><b>Name</b><span></span><b>Score</b></div>
          {bigData.map((eachbigvalue, bigIndex) => (
            <div className='leadplayerbox' key={bigIndex}>{bigIndex+1}<span></span> {eachbigvalue.userName} <span>   </span> {eachbigvalue.score}</div>
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
      <div className='Home-before-start-main'>
        <div className='Home-start-container'>
          <input type='text' placeholder='What should we call you' className='Home-input' onChange={handleUserNameChange}></input>
          <button className='Home-start-button' onClick={handleStart}>Start Game</button>
        </div>
        <div className='Home-leaderboard'>
        <div className='leadplayerbox'>{"Rank"}<span></span>{"Name"} <span></span> {"Score"}</div>
        {bigData.map((eachbigvalue, bigIndex) => (
            <div className='leadplayerbox' key={bigIndex}>{bigIndex+1}<span></span>{eachbigvalue.userName} <span></span> {eachbigvalue.score}</div>
          ))}
        </div>
      </div>
    )
  }
}

export default Home;