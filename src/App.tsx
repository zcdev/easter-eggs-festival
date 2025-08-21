import { useState, useReducer, useEffect } from "react";
import Header from "./components/Header.tsx";
import Scoreboard from "./components/Scoreboard.tsx";
import EggList from "./components/EggList.tsx";
import Egg from "./components/Egg.tsx";
import { getRandomInt } from "./utils/math.ts";
import { playSound, stopSound } from "./utils/sounds.ts";
import Button from "./components/Button.tsx";
import Modal from "./components/Modal.tsx";

// ---------- Types ----------
type State = {
  currentScore: number;
  targetScore: number;
  winScore: number;
  loseScore: number;
  isGameOver: boolean;
  isWon: boolean;
  isLost: boolean;
  isMuted: boolean;
  showModal: boolean;
};

type GameAction =
  | { type: "CLICK_EGG"; payload: number; }
  | { type: "TOGGLE_SOUND"; }
  | { type: "RETRY_GAME"; } // new round, keep tallies
  | { type: "RESTART_GAME"; }; // full reset

type EggItem = {
  id: number;
  image: string;
  value: number;
};

// ---------- Initial / init ----------
const initial: State = {
  currentScore: 0,
  targetScore: 19, // placeholder; real value assigned in init()
  winScore: 0,
  loseScore: 0,
  isGameOver: false,
  isWon: false,
  isLost: false,
  isMuted: false,
  showModal: false,
};

function init(): State {
  return { ...initial, targetScore: getRandomInt(19, 120) };
}

function generateEggs(count: number): EggItem[] {
  const eggsValues: number[] = [];
  while (eggsValues.length < count) {
    const eggValue: number = getRandomInt(1, 12);
    if (!eggsValues.includes(eggValue)) eggsValues.push(eggValue);
  }

  return eggsValues.map((value, i) => ({
    id: i + 1,
    image: `/assets/images/egg-${i + 1}`,
    value,
  }));
}

// ---------- Reducer ----------
function reducer(state: State, action: GameAction): State {
  switch (action.type) {
    case "CLICK_EGG": {
      if (state.isGameOver) return state; // ignore clicks post-game
      const newScore = state.currentScore + action.payload;

      if (newScore === state.targetScore) {
        return {
          ...state,
          currentScore: newScore,
          winScore: state.winScore + 1,
          isGameOver: true,
          isWon: true,
          isLost: false,
          showModal: true,
        };
      }

      if (newScore > state.targetScore) {
        return {
          ...state,
          currentScore: newScore,
          loseScore: state.loseScore + 1,
          isGameOver: true,
          isWon: false,
          isLost: true,
          showModal: true,
        };
      }

      return { ...state, currentScore: newScore };
    }

    case "TOGGLE_SOUND":
      return { ...state, isMuted: !state.isMuted };

    case "RETRY_GAME":
      // fresh round, keep tallies, clear result flags
      return {
        ...state,
        currentScore: 0,
        targetScore: getRandomInt(19, 120),
        isGameOver: false,
        isWon: false,
        isLost: false,
        showModal: false,
      };

    case "RESTART_GAME":
      // full reset + new target
      return {
        ...initial,
        targetScore: getRandomInt(19, 120),
      };

    default:
      return state;
  }
}

// ---------- UI copy ----------
const messages = {
  intro:
    "🌸 Pick wisely! Each egg holds a mystery number. Can you hit the target score exactly?",
  won: "🐣 Egg-cellent! You've matched the target score perfectly!",
  lost: "🥚 Oops! You went over the target.",
} as const;

export default function App() {
  // eggs don’t change between rounds; values stay unique per mount
  const [eggs] = useState<EggItem[]>(() => generateEggs(4));

  console.log(eggs);

  // lazy init ensures a fresh target on each mount/HMR
  const [state, dispatch] = useReducer(
    reducer,
    undefined as unknown as State,
    init,
  );

  // ---------- Handlers ----------
  function handleClick(value: number) {
    if (state.isGameOver) {
      dispatch({ type: "RETRY_GAME" });
      return;
    }
    dispatch({ type: "CLICK_EGG", payload: value });
  }

  function toggleSound() {
    // stop immediately so toggle never leaves a lingering clip
    stopSound();
    dispatch({ type: "TOGGLE_SOUND" });
  }

  function resetGame() {
    dispatch({ type: "RESTART_GAME" });
  }

  function replayGame() {
    dispatch({ type: "RETRY_GAME" });
  }

  // ---------- SFX: play once when modal opens, honor mute ----------
  useEffect(() => {
    if (!state.showModal || state.isMuted) return;
    if (state.isWon) playSound("won");
    else if (state.isLost) playSound("lost");
  }, [state.showModal, state.isMuted, state.isWon, state.isLost]);

  // ---------- Derived UI text ----------
  const muteText = state.isMuted ? "Turn On Sound" : "Turn Off Sound";
  const gameMessage = state.isWon ? messages.won : messages.lost;
  const replayText = state.isWon ? "Play Again" : "Try Again";

  return (
    <>
      <Header message={messages.intro} />
      <main>
        <Scoreboard state={state} />
        <EggList state={state}>
          {eggs.map((egg) => (
            <Egg key={egg.id} egg={egg} onClick={() => handleClick(egg.value)} />
          ))}
        </EggList>

        <section className="game-controls" aria-label="Game controls">
          <Button
            type="button"
            onClick={resetGame}
            className="button"
            ariaLabel="Start over"
          >
            Start Over
          </Button>
          <Button
            type="button"
            onClick={toggleSound}
            className="button"
            ariaLabel={muteText}
          >
            {muteText}
          </Button>
        </section>
      </main>

      <Modal isOpen={state.showModal} onClose={replayGame}>
        <h2>{gameMessage}</h2>
        <button className="game-button" onClick={replayGame}>
          {replayText}
        </button>
      </Modal>
    </>
  );
}
