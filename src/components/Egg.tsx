type EggProps = {
    egg: any;
    onClick: () => void;
};

export default function Egg({ egg, onClick }: EggProps) {
    return (
        <li>
            <button className="egg" onClick={onClick} aria-label={`Egg ${egg.id}, value: ${egg.value}}`}>
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
    );
}