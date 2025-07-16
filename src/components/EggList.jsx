export default function EggList({ children, state }) {
    return (
        <section className="egglist">
            <ul aria-label="Selectable mystery eggs">
                {children}
            </ul>
            <p>Current score: {state.currentScore}</p>
        </section>
    )
}