interface SpriteProps {
    className?: string;
    name: string;
}

export function Sprite(props: SpriteProps) {
    const { className, name } = props;

    return (
        <>
            <svg className={className}>
                <use xlinkHref={`/img/sprite.svg#icon-${name}`} />
            </svg>
        </>
    );
}
