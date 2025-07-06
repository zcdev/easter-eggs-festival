import { useState } from 'react'
import Header from './components/Header'
import Scoreboard from './components/Scoreboard'
import EggList from './components/EggList'
import Egg from './components/Egg'

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
  return (
    <>
      <Header message={message} />
      <main>
        <Scoreboard />
        <EggList>
          <Egg />
        </EggList>
      </main>
    </>
  )
}
