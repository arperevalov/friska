import { useState } from "react";
import CardInterface from "@/interfaces/Card";
import useCards from "@/hooks/useCards";
import useModals from "@/hooks/useModals";
import ModalsEnum from "@/enums/Modals";
import useSettings from "@/hooks/useSettings";
import FormUpdateCard from "./forms/FormUpdateCard";

export const Card = (props: CardInterface) => {
    const { addCardAction, removeCardAction, incrementCardLeftAction, decrementCardLeftAction } = useCards();
    const [active, setActive] = useState(false);
    const { toggleModalAction, closeModalAction } = useModals();
    const { getCardsStyleAction } = useSettings();
    const { id, title, exp_date, left_count, units, best_before, list_id, user_id } = props;

    const toggleActive = () => {
        setActive(!active);
    };

    const onIncrementClick = () => {
        incrementCardLeftAction(id);
    };

    const onDecrementClick = () => {
        decrementCardLeftAction(id);
    };

    const onRemoveClick = () => {
        removeCardAction(id);
    };

    const onCopyClick = () => {
        addCardAction({
            title,
            exp_date: new Date(exp_date).toISOString().replace(/(\d)T(\d.{0,})\.\d{0,}Z/, "$1 $2"),
            left_count,
            units,
            list_id,
            user_id,
            best_before,
        });

        toggleActive();
    };

    const onUpdateClick = () => {
        const formType = ModalsEnum.FormUpdateCard;
        toggleModalAction(
            formType,
            <FormUpdateCard
                parameters={id}
                onSubmit={() => {
                    closeModalAction(formType);
                }}
            />,
        );
    };

    const dateString = new Date(exp_date).toLocaleDateString();
    const checkExpired = () => {
        const daysBeforeInMillisec = best_before * 24 * 60 * 60 * 1000;
        const date = new Date();
        const expDate = new Date(exp_date);
        return date.getTime() - expDate.getTime() > daysBeforeInMillisec * -1;
    };
    return (
        <>
            <div className={`list__item${active ? " active" : ""} list__item--${getCardsStyleAction()}`}>
                <div
                    className={`card-overlay${active ? " active" : ""}`}
                    onClick={() => {
                        toggleActive();
                    }}
                ></div>
                <div
                    className={`card${active ? " active" : ""}${
                        checkExpired() ? " outdated" : ""
                    } card--${getCardsStyleAction()}`}
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
                                {`${left_count} ${units}`}
                                <div className="card__line-units">left</div>
                            </div>
                        </div>
                        <div className="card__bottom">
                            <h3 className="card__title">{title}</h3>
                        </div>
                    </div>
                    <div className="card__options">
                        <div className="card__options-row">
                            <div className="card__btns">
                                <button type="button" className="btn btn--sm btn--secondary" onClick={onDecrementClick}>
                                    -1
                                </button>
                                <button type="button" className="btn btn--sm btn--primary" onClick={onIncrementClick}>
                                    +1
                                </button>
                            </div>
                        </div>
                        <div className="card__options-row">
                            <div className="card__links">
                                <button
                                    type="button"
                                    onClick={onCopyClick}
                                    className="card__link link link--primary link--centered"
                                >
                                    Copy
                                </button>
                                <button
                                    type="button"
                                    onClick={onUpdateClick}
                                    className="card__link link link--primary link--centered"
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="card__link link link--secondary link--centered"
                                    onClick={onRemoveClick}
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
};
