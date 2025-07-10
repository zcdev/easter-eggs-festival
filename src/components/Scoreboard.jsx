export default function Scoreboard({ state }) {
    return (
        <>
            <section aria-label="Game status">
                <p>Target score: {state.targetScore}</p>
                <p>Win score: {state.winScore}</p>
                <p>Loss score: {state.lossScore}</p>
            </section>
        </>
    )
}