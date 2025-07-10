export default function EggList({ children, state }) {
    return (
        <section>
            <ul aria-label="Selectable mystery eggs">
                {children}
            </ul>
            <div>
                <p>Current score: {state.currentScore}</p>
            </div>
        </section>
    )
}