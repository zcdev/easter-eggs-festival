type GameState = {
    targetScore: number;
    winScore: number;
    loseScore: number;
};

type ScoreboardProps = {
    state: GameState;
};

export default function Scoreboard({ state }: ScoreboardProps) {
    return (
        <>
            <section className="scoreboard" aria-label="Game scores">
                <p>Target score: {state.targetScore}</p>
                <div className="gamestatus" aria-label="Game status">
                    <p>Win score: {state.winScore}</p>
                    <p>Loss score: {state.loseScore}</p>
                </div>
            </section>
        </>
    );
}