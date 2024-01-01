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

    const toggleActive = () => {
        setActive(!active);
    };

    return (
        <>
            <div className={`list${active ? " active" : ""}`} key={id}>
                <div className="list__header">
                    <h2 className="list__title">{title}</h2>
                    <button type="button" onClick={toggleActive} className="list__settings">
                        <span className="visually-hidden">Settings</span>
                    </button>
                </div>
                <div className="list__items">
                    {cards.length > 0
                        ? cards.map((card: CardInterface) => {
                              if (card.list_id === id) {
                                  return <Card {...card} key={card.id} />;
                              }
                          })
                        : ""}
                </div>
            </div>
        </>
    );
};

export default List;
