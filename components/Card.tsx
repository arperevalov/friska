import { useState } from "react";
import CardInterface from "@/interfaces/Card";
import { useSettingsStore } from "@/store/SettingsStore";
import Link from "next/link";
import useCards from "@/hooks/useCards";

export const Card = (props: CardInterface) => {
    const { daysBeforeSetting } = useSettingsStore((store) => store);
    const { removeCardAction, incrementCardLeftAction, decrementCardLeftAction } = useCards();
    const [active, setActive] = useState(false);
    const { id, title, exp_date, left_count, units } = props;

    const toggleActive = () => {
        setActive(!active);
    };

    const onIncrementClick = () => {
        incrementCardLeftAction();
    };

    const onDecrementClick = () => {
        decrementCardLeftAction();
    };

    const onRemoveClick = () => {
        removeCardAction(id);
    };

    const dateString = new Date(exp_date).toLocaleDateString();

    const checkExpired = () => {
        const daysBeforeInMillisec = daysBeforeSetting * 24 * 60 * 60 * 1000;
        const date = new Date();
        const oldDate = new Date(exp_date);
        return date.getTime() - oldDate.getTime() > daysBeforeInMillisec;
    };
    return (
        <>
            <div className={`list__item${active ? " active" : ""}`}>
                <div className={`card${active ? " active" : ""}${checkExpired() ? " outdated" : ""}`}>
                    <div
                        className="card__container"
                        onClick={() => {
                            toggleActive();
                        }}
                    >
                        <div className="card__top">
                            <div className="card__line">
                                {dateString}
                                <div>exp</div>
                            </div>
                            <div className="card__line">
                                {`${left_count} ${units}`}
                                <div>left</div>
                            </div>
                        </div>
                        <div className="card__bottom">
                            <h3 className="card__title">{title}</h3>
                        </div>
                    </div>
                    <div className="card__options">
                        <Link href={`/update/${id}`} className="card__link link link--primary link--centered">
                            Edit
                        </Link>
                        <button
                            type="button"
                            className="card__link link link--secondary link--centered"
                            onClick={onRemoveClick}
                        >
                            Remove
                        </button>
                        <div className="card__btns">
                            <button type="button" className="btn btn--sm btn--secondary" onClick={onDecrementClick}>
                                -1
                            </button>
                            <button type="button" className="btn btn--sm btn--primary" onClick={onIncrementClick}>
                                +1
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
