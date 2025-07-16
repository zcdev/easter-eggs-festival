export default function Scoreboard({ state }) {
    return (
        <>
            <section className="scoreboard" aria-label="Game scores">
                <p>Target score: <span>{state.targetScore}</span></p>
                <div className="gamestatus" aria-label="Game status">
                    <p>Win score: <span>{state.winScore}</span></p>
                    <p>Loss score: <span>{state.lossScore}</span></p>
                </div>
            </section>
        </>
    )
}