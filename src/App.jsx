import { useState, useReducer, useEffect } from 'react'
import Header from './components/Header'
import Scoreboard from './components/Scoreboard'
import EggList from './components/EggList'
import Egg from './components/Egg'
import { getRandomInt } from './utils/math'
import { playSound, stopSound } from './utils/sounds'
import Button from './components/Button'

const messages = {
  intro: "🌸 Pick wisely! Each egg holds a mystery number. Can you hit the target score exactly?",
  win: "🐣 Egg-cellent! You've matched the target score perfectly!",
  lose: "🥚 Oops! You went over the target. Try again!",
  progress: "🧺 The eggs are adding up—watch your total!",
  retry: "🐇 Ready to hunt again? Click an egg to start a new round!"
}

// Initial game state including score, status flags, and sound settings
const initialScores = {
  currentScore: 0,
  targetScore: getRandomInt(19, 120),
  winScore: 0,
  lossScore: 0,
  isGameOver: false,
  isWin: false,
  isLoss: false,
  isMuted: false,
  showModal: false
}

function gameReducer(state, action) {
  switch (action.type) {
    // Add the clicked egg’s value to the current score
    case 'CLICK_EGG':
      // Get the value of the egg from the action payload
      const eggValue = action.payload.value

      // Get the new score by adding the egg value to the current score
      const newScore = state.currentScore + eggValue

      // Win state: if the new score hits the target
      if (newScore === state.targetScore) {
        return {
          ...state,
          currentScore: newScore,
          winScore: state.winScore + 1,
          isGameOver: true,
          isWin: true,
          isLoss: false,
          showModal: true
        }
      }

      // Loss state: if the new score goes beyond the target
      if (newScore > state.targetScore) {
        return {
          ...state,
          currentScore: newScore,
          lossScore: state.lossScore + 1,
          isGameOver: true,
          isWin: false,
          isLoss: true,
          showModal: true
        }
      }

      // Update the current score
      return {
        ...state,
        currentScore: newScore
      }
    
    // Toggle sound setting and stop any currently playing audio
    case 'TOGGLE_SOUND':
      // Turn on/off sound
      return {
        ...state,
        isMuted: !state.isMuted
      }

    // Start a new round (reset score and status flags, keep win/loss)
    case 'RETRY_GAME':
      return {
        ...state,
        currentScore: 0,
        targetScore: getRandomInt(19, 120),
        isGameOver: false,
        showModal: false
      }

    // Reset everything to the initial state, with a new target score
    case 'RESTART_GAME':
      return {
        ...initialScores,
        targetScore: getRandomInt(19, 120)
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export default function App() {
  // Holds message strings for different game states
  const [message, setMessage] = useState(messages)

  // Generate 4 eggs on initial render and store in state
  const [eggs, setEggs] = useState(() => generateEggs(4))

  // Initialize scores by reducer function
  const [state, dispatch] = useReducer(gameReducer, initialScores)

  // Generate a list of eggs with unique random values
  function generateEggs(count) {

    // Create an empty array to store unique egg values
    const values = []

    // Generate only unique values until count is reached
    while (values.length < count) {

      // Get a random integer between 1 and 12
      const value = getRandomInt(1, 12);

      // Prevent duplicates by checking if the value already exists
      if (!values.includes(value)) values.push(value)
    }

    // Return the list of egg objects
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      image: `./assets/images/egg-${i + 1}.png`,
      value: values[i],
      clicked: false
    }))
  }

  // Handle the value from the egg clicked
  function handleClick(value) {
    // Check if the game is over
    if (state.isGameOver === false) {
      // If the game is not over, add the egg value to the current score
      dispatch({ type: 'CLICK_EGG', payload: { value } })
    } else {
      // If the game is over, reset for a new round but keep the win/loss scores
      dispatch({ type: 'RETRY_GAME' })
    }
  }

  // Handle the start over button
  function handleRestart() {
    // Restart the entire game from initial state
    dispatch({ type: 'RESTART_GAME' })
  }

  // Handle sound toggle
  function toggleSound() {
    // Turn on/off sounds for the rest of the game
    dispatch({ type: 'TOGGLE_SOUND' })
    // Immediately mute the sound
    stopSound()
  }

  // Play win/loss sound clip after the score updates, unless muted
  useEffect(() => {
    if (state.isWin === true && state.isGameOver === true && state.isMuted === false) playSound('win') // winSound = './assets/sounds/easter-eggs-festival-fx-win.mp3'
  
    if (state.isLoss === true && state.isGameOver === true && state.isMuted === false) playSound('loss') // lossSound = './assets/sounds/easter-eggs-festival-fx-loss.mp3'

    // Play the sound clip every time the score is updated
  }, [state.winScore, state.lossScore])

  return (
    <>
      <Header message={message} />
      <main>
        <Scoreboard state={state} />
        <EggList state={state}>
          {eggs.map(egg => (
            <Egg
              key={egg.id}
              egg={egg}
              onClick={handleClick}
            />
          ))}
        </EggList>
        <section className="game-controls" aria-label="Game controls">
          <Button onClick={handleRestart} aria-label="Start over">
            Start Over
          </Button>
          <Button onClick={toggleSound} aria-label={state.isMuted === true ? "Turn On Sound" : "Turn Off Sound" }>
            {state.isMuted === true ? "Turn On Sound" : "Turn Off Sound"}
          </Button>
        </section>
      </main>
    </>
  )
}