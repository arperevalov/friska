import Header from "@/components/Header";
import useLists from "@/hooks/useLists";
import { useMainStore } from "@/store/MainStore";
import { useSettingsStore } from "@/store/SettingsStore";
import { FormEvent, useState } from "react";

export default function Settings() {
    const { daysBeforeSetting, setDaysBeforeSetting } = useSettingsStore((state) => state);
    const { lists, addList, removeList } = useMainStore((state) => state);

    const [newListValue, setNewListValue] = useState("");

    useLists();

    const createList = (event: FormEvent) => {
        event.preventDefault();

        addList({
            title: newListValue,
            id: lists.length,
        });
        setNewListValue("");
    };

    return (
        <>
            <Header />
            <main>
                <div className="container">
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
                                                      removeList(list.id);
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
                    <form onSubmit={createList}>
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
