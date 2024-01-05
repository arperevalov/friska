"use client";

import useLists from "@/hooks/useLists";
import useCards from "@/hooks/useCards";
import List from "@/components/List";
import Header from "@/components/Header";
import { useState } from "react";
import useModals from "@/hooks/useModals";
import ModalsEnum from "@/enums/Modals";

export default function Home() {
    const { lists } = useLists();
    const { cards } = useCards();
    const { toggleModalAction } = useModals();

    const [searchValue, setSearchValue] = useState<string>("");

    const onSearchChange = (event: React.FormEvent<HTMLInputElement>) => {
        setSearchValue(event.currentTarget?.value);
    };

    const onCreateListClick = () => {
        toggleModalAction(ModalsEnum.FormNewList);
    };

    const filteredCards = cards ? cards.filter((item) => item.title?.match(new RegExp(searchValue, "gi"))) : [];

    if (!lists) return <></>;

    return (
        <>
            <Header />
            <main>
                <div className="container">
                    {lists.length === 0 ? (
                        <>
                            <h1 className="h1">There are no lists!</h1>
                        </>
                    ) : (
                        <>
                            <label htmlFor="" className="input">
                                <span className="input__label">Search</span>
                                <input
                                    className="input__input"
                                    type="text"
                                    onChange={onSearchChange}
                                    value={searchValue}
                                />
                            </label>
                            {lists.map((list) => {
                                return <List key={list.id} id={list.id} title={list.title} cards={filteredCards} />;
                            })}
                        </>
                    )}
                    <button type="button" onClick={onCreateListClick} className="link link--primary">
                        Create new list
                    </button>
                </div>
            </main>
        </>
    );
}
