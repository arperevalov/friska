import { forwardRef, useState } from "react";
import CardInterface from "@/interfaces/Card";
import useSettings from "@/hooks/useSettings";
import classNames from "classnames";

type Props = React.HTMLAttributes<HTMLElement> & {
    card: CardInterface
    onCopyClick: (id: number) => void
    onRemoveClick: (id: number) => void
    onIncrementClick: (id: number) => void
    onDecrementClick: (id: number) => void
    onUpdateClick: (id: number) => void
}

const Card = forwardRef<HTMLElement, Props>(({ card, onCopyClick, onDecrementClick, onIncrementClick, onRemoveClick, onUpdateClick }) => {
    const [active, setActive] = useState(false);
    const { getCardsStyleAction } = useSettings();

    const toggleActive = () => {
        setActive(!active);
    };

    const dateString = new Date(card.exp_date).toLocaleDateString();
    const checkExpired = () => {
        const daysBeforeInMillisec = card.best_before * 24 * 60 * 60 * 1000;
        const date = new Date();
        const expDate = new Date(card.exp_date);
        return date.getTime() - expDate.getTime() > daysBeforeInMillisec * -1;
    };

    return (
        <>
            <div className={
                classNames(
                    `list__item`,
                    `list__item--${getCardsStyleAction()}`,
                    {
                        'active': active
                    }
                )}>
                <div
                    className={`card-overlay${active ? " active" : ""}`}
                    onClick={() => {
                        toggleActive();
                    }}
                ></div>
                <div
                    className={classNames(`card${active ? " active" : ""}${checkExpired() ? " outdated" : ""
                        } card--${getCardsStyleAction()}`)}
                >
                    <div
                        className="card__container"
                        onClick={() => {
                            toggleActive();
                        }}
                    >
                        <div className="card__top">
                            <div className="card__line">
                                {dateString}
                                <div className="card__line-units">exp</div>
                            </div>
                            <div className="card__line">
                                {`${card.left_count} ${card.units}`}
                                <div className="card__line-units">left</div>
                            </div>
                        </div>
                        <div className="card__bottom">
                            <h3 className="card__title">{card.title}</h3>
                        </div>
                    </div>
                    <div className="card__options">
                        <div className="card__options-row">
                            <div className="card__btns">
                                <button type="button" className="btn btn--sm btn--secondary" onClick={() => onDecrementClick(card.id)}>
                                    -1
                                </button>
                                <button type="button" className="btn btn--sm btn--primary" onClick={() => onIncrementClick(card.id)}>
                                    +1
                                </button>
                            </div>
                        </div>
                        <div className="card__options-row">
                            <div className="card__links">
                                <button
                                    type="button"
                                    onClick={() => onCopyClick(card.id)}
                                    className="card__link link link--primary link--centered"
                                >
                                    Copy
                                </button>
                                <button
                                    type="button"
                                    onClick={() => onUpdateClick(card.id)}
                                    className="card__link link link--primary link--centered"
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="card__link link link--secondary link--centered"
                                    onClick={() => onRemoveClick(card.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

Card.displayName = 'Card'

export { Card }