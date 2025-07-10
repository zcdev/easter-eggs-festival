import { useState, useReducer } from 'react'
import Header from './components/Header'
import Scoreboard from './components/Scoreboard'
import EggList from './components/EggList'
import Egg from './components/Egg'
import { getRandomInt } from './utils/randomize'

const messages = {
  intro: "🌸 Pick wisely! Each egg holds a mystery number. Can you hit the target score exactly?",
  win: "🐣 Egg-cellent! You've matched the target score perfectly!",
  lose: "🥚 Oops! You went over the target. Try again!",
  progress: "🧺 The eggs are adding up—watch your total!",
  retry: "🐇 Ready to hunt again? Click an egg to start a new round!"
}

const initialScores = {
  currentScore: 0,
  targetScore: getRandomInt(19, 120),
  winScore: 0,
  lossScore: 0,
  isGameOver: false,
  showModal: false
}

function gameReducer(state, action) {
  switch (action.type) {
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
          showModal: true
        }
      }

      // Update the current score
      return {
        ...state,
        currentScore: newScore
      }

    case 'RETRY':
      return {
        ...state,
        currentScore: 0,
        targetScore: getRandomInt(19, 120),
        isGameOver: false,
        showModal: false
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
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
      // If the game is over, reset for a new round
      dispatch({ type: 'RETRY' })
    }
  }

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
      </main>
    </>
  )
}
