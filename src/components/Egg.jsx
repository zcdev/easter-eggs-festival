export default function Egg({ egg, onClick }) {
    return (
        <li>
            <button className="egg" onClick={() => onClick(egg.value)} aria-label={egg.clicked ? `Egg ${egg.id}, value: ${egg.value}` : `Egg ${egg.id}`}>
                <picture>
                    <source
                        type="image/webp"
                        srcSet={`${egg.image}.webp`}
                    />
                    <img
                        src={`${egg.image}.png`}
                        width={100}
                        height={133}
                        alt=""
                        aria-hidden="true"
                    />
                </picture>
            </button>
        </li>
    )
}