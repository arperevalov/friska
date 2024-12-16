"use client";

import CardInterface from "@/interfaces/Card";
import { useState } from "react";
import useModals from "@/hooks/useModals";
import ModalsEnum from "@/enums/Modals";
import FormUpdateList from "../../components/forms/FormUpdateList";
import FormNewCard from "../../components/forms/FormNewCard";
import { Sprite } from "@/components/shared";
import useCards from "@/hooks/useCards";
import FormUpdateCard from "../../components/forms/FormUpdateCard";
import useSettings from "@/hooks/useSettings";
import { Card } from "@/features";

interface ListProps {
    id: number;
    title: string;
    cards: CardInterface[];
    searchValue: string;
}

export const List = (props: ListProps) => {
    const { id, title, cards, searchValue } = props;
    const [active, setActive] = useState(false);
    const { incrementCardLeftAction, decrementCardLeftAction, removeCardAction, copyCardAction } = useCards();
    const { toggleModalAction, closeModalAction } = useModals();
    const { getCardsStyleAction } = useSettings();

    const onUpdateCardClick = (id: number) => {
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

    const filteredCards = cards.filter((card: CardInterface) => card.list_id === id);
    const sortedCards = filteredCards.sort((a, b) => {
        const aDate = new Date(a.exp_date).getTime();
        const bDate = new Date(b.exp_date).getTime();

        return aDate - bDate;
    });

    const toggleActive = () => {
        setActive(!active);
    };

    const onUpdateClick = () => {
        const formType = ModalsEnum.FormUpdateList;
        toggleModalAction(
            formType,
            <FormUpdateList
                listId={id}
                cardsLength={sortedCards.length}
                onSubmit={() => {
                    closeModalAction(formType);
                }}
            />,
        );
    };

    const onNewCardClick = () => {
        const formType = ModalsEnum.FormNewCard;
        toggleModalAction(
            formType,
            <FormNewCard
                listId={id}
                onSubmit={() => {
                    closeModalAction(formType);
                }}
            />,
        );
    };

    return (
        <>
            <div className={`list${searchValue.length > 0 ? " active" : active ? " active" : ""}`} key={id}>
                <div className="list__header">
                    <h2 className="list__title">{title}</h2>
                    {active ? (
                        <>
                            <button onClick={onUpdateClick} className="list__update">
                                <Sprite name="settings" />
                                <span className="visually-hidden">Update list</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="list__count">
                                {sortedCards.length} {sortedCards.length === 1 ? "item" : "items"}
                            </div>
                        </>
                    )}
                    <button type="button" onClick={toggleActive} className="list__toggle-active">
                        <span className="visually-hidden">Toggle list</span>
                    </button>
                </div>
                <div className="list__body">
                    {sortedCards.length <= 0 && (
                        <div className="list__text-empty">You don’t have any cards in this list</div>
                    )}
                    <div className="list__items">
                        {sortedCards.map((card: CardInterface) => {
                            if (card.list_id === id) {
                                return (
                                    <Card
                                        onCopyClick={copyCardAction}
                                        onDecrementClick={decrementCardLeftAction}
                                        onIncrementClick={incrementCardLeftAction}
                                        onRemoveClick={removeCardAction}
                                        onUpdateClick={onUpdateCardClick}
                                        cardStyle={getCardsStyleAction()}
                                        card={card}
                                        key={card.id}
                                    />
                                );
                            }
                        })}
                        <div className="list__item">
                            <button onClick={onNewCardClick} className="list__button-add">
                                <div className="list__button-add-icon">
                                    <Sprite name="new-card-list" />
                                </div>
                                Add new
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default List;
