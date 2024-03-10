"use client";

import useLists from "@/hooks/useLists";
import useCards from "@/hooks/useCards";
import List from "@/components/List";
import Header from "@/components/Header";
import { ReactNode, useState } from "react";
import useModals from "@/hooks/useModals";
import ModalsEnum from "@/enums/Modals";
import Sprite from "@/components/Sprite";
import FormNewList from "@/components/forms/FormNewList";

function Home(): ReactNode {
    const { lists } = useLists();
    const { cards } = useCards();
    const { toggleModalAction, closeModalAction } = useModals();

    const [searchValue, setSearchValue] = useState<string>("");

    const onSearchChange = (event: React.FormEvent<HTMLInputElement>) => {
        setSearchValue(event.currentTarget?.value);
    };

    const onSearchResetClick = () => {
        setSearchValue("");
    };

    const onCreateListClick = () => {
        const formType = ModalsEnum.FormNewList;
        toggleModalAction(
            formType,
            <FormNewList
                onSubmit={() => {
                    closeModalAction(formType);
                }}
            />,
        );
    };

    const filteredCards = cards ? cards.filter((item) => item.title?.match(new RegExp(searchValue, "gi"))) : [];

    if (!lists) return <></>;

    return (
        <>
            <Header isLogout={false} isBack={false} />
            <main>
                <div className="container">
                    {lists.length === 0 ? (
                        <>
                            <div className="empty">
                                <Sprite name="empty-list" className="empty__picture" />
                                <h1 className="empty__text">
                                    Oh, no! You don’t have any list yet. <br />
                                    Start with creating one!
                                </h1>
                            </div>
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
                                {searchValue.length > 0 ? (
                                    <>
                                        <button
                                            className="input__button link link--primary"
                                            type="button"
                                            onClick={onSearchResetClick}
                                        >
                                            Reset
                                        </button>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </label>
                            {lists.map((list) => {
                                return (
                                    <List
                                        searchValue={searchValue}
                                        key={list.id}
                                        id={list.id}
                                        title={list.title}
                                        cards={filteredCards}
                                    />
                                );
                            })}
                        </>
                    )}
                    <button type="button" onClick={onCreateListClick} className="link link--primary link--centered">
                        Create new list
                    </button>
                </div>
            </main>
        </>
    );
}

export default Home;
