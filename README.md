# Exploding Kitten

Welcome to Exploding Kitten, a thrilling single-player card game! This web application is built using React with Redux for the frontend and Golang for the backend, with MongoDB as the database.

## Game Objective
The objective of the game is simple: draw all 5 cards from the deck without drawing the Exploding Kitten card. Each card drawn brings you closer to victory, but beware, one wrong draw and it's game over!

## How to Play
1. **Start the Game:** Click the "Start Game" button to begin.
2. **Draw a Card:** Click on the deck to reveal a card. The card will be removed from the deck.
3. **Card Types:**
   - **Cat Card 😼:** Safe to draw, simply removes the card from the deck.
   - **Exploding Kitten Card 💣:** Game over! You lose if you draw this card.
   - **Defuse Card 🙅‍♂️:** Removes one Exploding Kitten card from the deck if drawn before an Exploding Kitten.
   - **Shuffle Card 🔀:** Restarts the game, refilling the deck with 5 cards.
4. **Winning:** You win the game by drawing all 5 cards without drawing an Exploding Kitten.

## Features
- **Username Creation:** Create a unique username to enter the game.
- **Leaderboard:** Records the number of games won by each user, with one game won equaling one point.
- **Bonus Features:** 
   - Automatically save the game progress for each user.
   - Real-time leaderboard updates for all users playing simultaneously.

## Technologies Used
- **Frontend:** React with Redux
- **Backend:** Golang
- **Database:** MongoDB

## Getting Started
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the frontend server using `npm start`.
4. Start the backend server (details in the backend repository).

Enjoy Exploding Kitten, and may the odds be ever in your favor!