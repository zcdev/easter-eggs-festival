export default function Egg({ egg, onClick }) {
    return (
        <li>
            <button className="egg" onClick={() => onClick(egg.value)}  aria-label={egg.clicked ? `Egg ${egg.id}, value: ${egg.value}` : `Egg ${egg.id}`}>
                <img src={egg.image} alt="" aria-hidden="true" />
            </button>
        </li>
    )
}