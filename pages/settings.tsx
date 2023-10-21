import Header from "@/components/Header";
import useLists from "@/hooks/useLists";
import { useMainStore } from "@/store/MainStore";
import { useSettingsStore } from "@/store/SettingsStore";
import Head from "next/head";
import { FormEvent, useState } from "react";

export default function Settings() {
    const { daysBeforeSetting, setDaysBeforeSetting } = useSettingsStore((state) => state);
    const { lists, addList, removeList } = useMainStore((state) => state);

    const [newListValue, setNewListValue] = useState("");

    useLists();

    const fetchCreateList = (event: FormEvent) => {
        event.preventDefault();

        fetch("/api/lists", {
            method: 'post',
            body: JSON.stringify({
                title: newListValue,
            })
        })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                if (response) {
                    const formattedData = {
                        ...response.lists,
                    };
                    addList(formattedData);
                }
            });
    };

    const fetchRemoveList = (id: number) => {
        fetch(`/api/lists/${id}`, {method: 'delete'}).then((response) => {
            if (response.ok) {
                removeList(id);
            }
        });
    };

    return (
        <>
            <Head>
                <title>Account — Friska</title>
                <meta name="description" content="Storage management app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header title="Account" />
            <main>
                <div className="container">
                    <div className="input-row">
                        <div className="input-row__col">
                            <label htmlFor="" className="input">
                                <span className="input__label">Best before limit, days</span>
                                <input
                                    onChange={(event) => {
                                        setDaysBeforeSetting(event.currentTarget.value);
                                    }}
                                    className="input__input"
                                    type="number"
                                    value={daysBeforeSetting}
                                    min="0"
                                />
                            </label>
                        </div>
                        <div className="input-row__col">
                            <p className="input-row__text">
                                Set number of days when we should notify you about outdated products in your list
                            </p>
                        </div>
                    </div>

                    <div className="input">
                        <span className="input__label">Categories</span>
                        <div className="chips">
                            {lists.length > 0
                                ? lists.map((list) => (
                                      <div key={list.id} className="chips__item">
                                          <div className="chips__content">
                                              {list.title}
                                              <button
                                                  type="button"
                                                  className="chips__remove"
                                                  onClick={() => {
                                                      fetchRemoveList(list.id);
                                                  }}
                                              >
                                                  <svg
                                                      className="chips__icon"
                                                      width="8"
                                                      height="8"
                                                      viewBox="0 0 8 8"
                                                      fill="none"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                      <path
                                                          d="M1.1709 1.17188L6.82775 6.82873"
                                                          stroke="#050401"
                                                          strokeWidth="2"
                                                      />
                                                      <path
                                                          d="M6.82812 1.17139L1.17127 6.82824"
                                                          stroke="#050401"
                                                          strokeWidth="2"
                                                      />
                                                  </svg>
                                              </button>
                                          </div>
                                      </div>
                                  ))
                                : ""}
                        </div>
                    </div>
                    <form onSubmit={fetchCreateList}>
                        <label htmlFor="" className="input">
                            <input
                                className="input__input"
                                value={newListValue}
                                onChange={(event) => {
                                    setNewListValue(event.currentTarget.value);
                                }}
                                type="text"
                                required
                            />
                            <button className="input__button link link--primary" type="submit">
                                Add Category
                            </button>
                        </label>
                    </form>
                </div>
            </main>
        </>
    );
}
