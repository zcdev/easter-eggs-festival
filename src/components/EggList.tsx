type EggListProps = {
    children: React.ReactNode;
    currentScore: number;
};

export default function EggList({ children, currentScore }: EggListProps) {
    return (
        <section className="egglist">
            <ul aria-label="Selectable mystery eggs">
                {children}
            </ul>
            <p>Current score: {currentScore}</p>
        </section>
    );
}