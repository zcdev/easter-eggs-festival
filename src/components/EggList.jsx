export default function EggList({ children }) {
    return (
        <section aria-label="List of hidden eggs">
            <ul>
                {children}
            </ul>
        </section>
    )
}