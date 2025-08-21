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
                <p>Target score: <span>{state.targetScore}</span></p>
                <div className="gamestatus" aria-label="Game status">
                    <p>Win score: <span>{state.winScore}</span></p>
                    <p>Loss score: <span>{state.loseScore}</span></p>
                </div>
            </section>
        </>
    );
}