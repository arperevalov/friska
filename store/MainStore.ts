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
                return { ...card};
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

            const left = state.cards[index].left + 1;

            state.cards[index] = {
                ...state.cards[index],
                left,
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

            const left = state.cards[index].left > 0 ? state.cards[index].left - 1 : 0;

            state.cards[index] = {
                ...state.cards[index],
                left,
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
    removeList: (id: number) =>
        set((state) => {
            const index = state.lists.findIndex((item) => {
                return item.id === id;
            });

            const cards = state.cards.find((item) => {
                if (item.listId === id) return item;
            });

            if (!index && cards) return {};

            state.lists.splice(index, 1);

            return {
                lists: [...state.lists],
            };
        }),
}));
