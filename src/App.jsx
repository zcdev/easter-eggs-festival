import { useState } from 'react'
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

export default function App() {
  // UI messages
  const [message, setMessage] = useState(messages)

  // Generate 4 eggs on initial render and store in state
  const [eggs, setEggs] = useState(() => generateEggs(4))

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

  return (
    <>
      <Header message={message} />
      <main>
        <Scoreboard />
        <EggList>
          {eggs.map(egg => (
            <Egg
              key={egg.id}
              egg={egg}
            />
          ))}
        </EggList>
      </main>
    </>
  )
}
