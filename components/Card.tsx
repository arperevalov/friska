import { useState } from "react";
import CardInterface from "@/interfaces/Card";
import useCards from "@/hooks/useCards";
import useModals from "@/hooks/useModals";
import ModalsEnum from "@/enums/Modals";
import useLists from "@/hooks/useLists";
import useSettings from "@/hooks/useSettings";

export const Card = (props: CardInterface) => {
    const { removeCardAction, incrementCardLeftAction, decrementCardLeftAction } = useCards();
    const [active, setActive] = useState(false);
    const { lists } = useLists();
    const { toggleModalAction } = useModals();
    const { getCardsStyleAction } = useSettings();
    const { id, title, exp_date, left_count, units, list_id } = props;

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

    const onUpdateClick = () => {
        toggleModalAction(ModalsEnum.FormUpdateCard, id);
    };

    const dateString = new Date(exp_date).toLocaleDateString();
    const listIndex = lists.findIndex((item) => item.id === list_id);
    const listBestBefore = lists[listIndex].best_before;

    const checkExpired = () => {
        const daysBeforeInMillisec = listBestBefore * 24 * 60 * 60 * 1000;
        const date = new Date();
        const expDate = new Date(exp_date);
        return date.getTime() - expDate.getTime() > daysBeforeInMillisec * -1;
    };
    return (
        <>
            <div className={`list__item${active ? " active" : ""}`}>
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
