export default function Egg({ egg }) {
    return (
        <li>
            <button className="egg" aria-label={egg.clicked ? `Egg ${egg.id}, value: ${egg.value}` : `Egg ${egg.id}`}>
                <img src={egg.image} alt="" aria-hidden="true" />
            </button>
        </li>
    )
}