import React, { useState, useEffect } from 'react'
import "./Home.css";
import {useDispatch} from 'react-redux';
import { addScore, setuserName } from '../app/actions';
import axios from "axios";
import cat from "./../images/cat.svg";
import bomb from "./../images/bomb.svg";
import diffuse from "./../images/wire cutter.png";
import shuffle from "./../images/cards.svg";
import logomain from "./../images/logocat.jpg"
import url from './Address';


function Home() {
  const [score, setScore] = useState(0);
  const [hiddenValues, setHiddenValues] = useState([]);
  const [isStarted, setStarted] = useState(false);
  const [cardNumber, setCardNumber] = useState([-1, -1]);
  const [foundDiffuse, setFoundDiffuse] = useState(0);
  const [userName, setUserName] = useState("");
  const [bigData, setBigData] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [anyFlipped, setAnyFlipped] = useState(-1);
  const dispatch = useDispatch();

  const imagesOrganiser = [cat, diffuse, shuffle, bomb];
  const infoOrganiser = ["Wow a kitten card", "You can diffuse a bomb now",   "You got to restart now", "You lose!"];

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
    await axios.get(url + "getall")
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
    await axios.post(url+"updatescore", {score, userName})
    .then(res => {
      if(res.data.message === "User not found"){
        alert("Some error occured!");}
      else{
        leaderBoardData();

      }
    })
  }
  
  function handleStart() {
    setFlipped([false, false, false, false, false]);
    setCardNumber([0,1,2,3,4]);
    setFoundDiffuse(0);
    dispatch(addScore(score));
    dispatch(setuserName(userName));
    setHiddenValues(() => {
      const numbers = [];
      for (let i = 0; i < 5; i++) {
        const randomNumber = Math.floor(Math.random() * 4) + 1;
        numbers.push(randomNumber);
      }
      return numbers;
    })
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
      var flag = false;
      handleCardClick(index);
      if(hiddenValues[index] === 2){
        setFoundDiffuse(foundDiffuse+1);
      }
      else if(hiddenValues[index] === 4){
        if(foundDiffuse > 0){
          setFoundDiffuse(foundDiffuse-1);
        }
        else{
          flag = true;
        }
      }
      setTimeout(() => {
        setFlipped(prevState => {
          const newState = [...prevState];
          newState.splice(index, 1); 
          return newState;
        })
        setTimeout(() => {
          if(hiddenValues[index] === 3 || flag === true){
            handleStart();
          }
          else{
            removeCard(index);
          }
          setAnyFlipped(-1);
        }, 500);
      }, 1000);
    }

    function handleCardClick(Index){
      setAnyFlipped(Index);
      setFlipped(prevState => {
        const newState = [...prevState];
        newState[Index] = true; 
        return newState;
      })
    }
    return (
      <div className='Home-main'>
        <div className='Home-cards-main'>
          <div className='Home-text-container'>
            <div className='Home-text'><span>{userName} </span>  Click on any Card</div>
            <div className='Home-score-container'>
              <h2>Score : {score}</h2>
            </div>
          </div>
          <div className='Home-card-container'>
          {cardNumber.map((eachcardvalue, flippedIndex) => (
          <div className={`Each-card-container ${flipped[flippedIndex]? 'flipped':''}`}  key={flippedIndex}>
            <div className="cards" key={flippedIndex}>
              <div className="front" onClick={() => flipCardHandler(flippedIndex)}><img src={logomain} alt="Avatar" className='front-image'/></div>
              <div className="back">
                <img className="front-image" src={imagesOrganiser[hiddenValues[flippedIndex]-1]} alt='catgame'/>
              </div>
            </div>
          </div>
      ))}
          </div>
        </div>
        <div className='leaderboard-container'>
          <div className='Home-leaderboard'>
          <div className='leadplayerbox'><b>Rank</b><span></span><b>Name</b><span></span><b>Score</b></div>
            {bigData.map((eachbigvalue, bigIndex) => (
              <div className='leadplayerbox' key={bigIndex}>{bigIndex+1}<span></span> {eachbigvalue.userName} <span>   </span> {eachbigvalue.score}</div>
            ))}
          </div>
          <div className='rules-and-info'>
            <div className='info'>
              <h3 className='info-center'>{infoOrganiser[hiddenValues[anyFlipped]-1]}</h3>
            </div>
            <div className='rules'>Rules-
              <ul>
                <li>If the card drawn from the deck is a cat card, then the card is removed from the deck.</li>
                <li>If the card is exploding kitten (bomb) then the player loses the game.</li>
                <li>If the card is a defusing card, then the card is removed from the deck. This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.</li>
                <li>- If the card is a shuffle card, then the game is restarted and the deck is filled with 5 cards again.</li>
              </ul>
            </div>
          </div>
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
          <input type='text' placeholder='What should I call you' className='Home-input' onChange={handleUserNameChange}></input>
          <button className='Home-start-button' onClick={handleStart}>Start Game</button>
        </div>
        <div className='leaderboard-container'>
          <div className='Home-leaderboard'>
          <div className='leadplayerbox'>{"Rank"}<span></span>{"Name"} <span></span> {"Score"}</div>
          {bigData.map((eachbigvalue, bigIndex) => (
              <div className='leadplayerbox' key={bigIndex}>{bigIndex+1}<span></span>{eachbigvalue.userName} <span></span> {eachbigvalue.score}</div>
            ))}
          </div>
          <div className='rules-and-info'>
          <div className='rules'>Rules-
              <ul>
                <li>If the card drawn from the deck is a cat card, then the card is removed from the deck.</li>
                <li>If the card is exploding kitten (bomb) then the player loses the game.</li>
                <li>If the card is a defusing card, then the card is removed from the deck. This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.</li>
                <li>- If the card is a shuffle card, then the game is restarted and the deck is filled with 5 cards again.</li>
              </ul>
            </div>
          </div>
        </div>
        </div>
    )
  }
}

export default Home;