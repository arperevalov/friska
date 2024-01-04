"use client";

import CardInterface from "@/interfaces/Card";
import { Card } from "./Card";
import { useState } from "react";

interface ListProps {
    id: number;
    title: string;
    cards: CardInterface[];
}

export const List = (props: ListProps) => {
    const { id, title, cards } = props;
    const [active, setActive] = useState(false);

    const filteredCards = cards.filter((card: CardInterface) => card.list_id === id);

    const toggleActive = () => {
        setActive(!active);
    };

    if (cards.length === 0) return;

    return (
        <>
            <div className={`list${active ? " active" : ""}`} key={id}>
                <div className="list__header">
                    <h2 className="list__title">{title}</h2>
                    <div className="list__count">
                        {filteredCards.length} {filteredCards.length === 1 ? "item" : "items"}
                    </div>
                    {filteredCards.length === 0 ? <></> : <>
                        <button type="button" onClick={toggleActive} className="list__toggle-active">
                            <span className="visually-hidden">Toggle list</span>
                        </button>
                    </>}
                </div>
                <div className="list__items">
                    {cards.length > 0
                        ? filteredCards.map((card: CardInterface) => {
                              if (card.list_id === id) {
                                  return <Card {...card} key={card.id} />;
                              }
                          })
                        : "There are no cards for this list"}
                </div>
            </div>
        </>
    );
};

export default List;
