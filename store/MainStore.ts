import CardInterface from "@/interfaces/Card";
import ListInterface from "@/interfaces/List";
import { create } from "zustand";

interface MainStoreInterface {
    lists: ListInterface[];
    cards: CardInterface[];
    addCard: CallableFunction;
    updateCard: CallableFunction;
    removeCard: CallableFunction;
    setLists: CallableFunction;
    addList: CallableFunction;
    initCards: CallableFunction;
    updateList: CallableFunction;
    removeList: CallableFunction;
    incrementCardLeft: CallableFunction;
    decrementCardLeft: CallableFunction;
}

export const useMainStore = create<MainStoreInterface>((set) => ({
    lists: [],
    cards: [],
    initCards: (cards: CardInterface[]) =>
        set(() => {
            const newCards = cards.map((card) => {
                return { ...card };
            });
            return {
                cards: [...newCards],
            };
        }),
    addCard: (card: CardInterface) =>
        set((state) => {
            return { cards: [...state.cards, { ...card }] };
        }),
    updateCard: (card: CardInterface) =>
        set((state) => {
            const index = state.cards.findIndex((item) => {
                return item.id === card.id;
            });
            state.cards[index] = card;
            return { cards: [...state.cards] };
        }),
    removeCard: (id: number) =>
        set((state) => {
            const index = state.cards.findIndex((item) => {
                return item.id === id;
            });
            state.cards.splice(index, 1);
            return { cards: [...state.cards] };
        }),
    incrementCardLeft: (id: number) =>
        set((state) => {
            const index = state.cards.findIndex((item) => {
                return id === item.id;
            });

            const left_count = state.cards[index].left_count + 1;

            state.cards[index] = {
                ...state.cards[index],
                left_count,
            };

            return {
                cards: [...state.cards],
            };
        }),
    decrementCardLeft: (id: number) =>
        set((state) => {
            const index = state.cards.findIndex((item) => {
                return id === item.id;
            });

            const left_count = state.cards[index].left_count > 0 ? state.cards[index].left_count - 1 : 0;

            state.cards[index] = {
                ...state.cards[index],
                left_count,
            };

            return {
                cards: [...state.cards],
            };
        }),
    setLists: (lists: ListInterface[]) =>
        set(() => {
            return { lists };
        }),
    addList: (list: ListInterface) =>
        set((state) => {
            return {
                lists: [...state.lists, list],
            };
        }),
    updateList: (list: ListInterface) =>
        set((state) => {
            const index = state.lists.findIndex((item) => {
                return item.id === list.id;
            });
            state.lists[index] = list;
            return { lists: [...state.lists] };
        }),
    removeList: (id: number) =>
        set((state) => {
            return {
                lists: [...state.lists.filter((item) => item.id !== id)],
            };
        }),
}));
