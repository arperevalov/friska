interface SpriteProps {
    className?: string;
    name: string;
}

export default function Sprite(props: SpriteProps) {
    const { className, name } = props;

    return (
        <>
            <svg className={className}>
                <use xlinkHref={`/sprite.svg#icon-${name}`} />
            </svg>
        </>
    );
}
