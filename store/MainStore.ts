import CardInterface from "@/interfaces/Card";
import ListInterface from "@/interfaces/List";
import { create } from "zustand";

interface MainStoreInterface {
    lists: ListInterface[],
    cards: CardInterface[],
    addCard: CallableFunction,
    updateCard: CallableFunction,
    setLists: CallableFunction,
    addList: CallableFunction,
	initCards: CallableFunction
  }
  
export const useMainStore = create<MainStoreInterface>(set => ({
    lists: [],
    cards: [],
	initCards: (cards: CardInterface[]) => set((state) => {
		const newCards = cards.map( (card, index) => {
			const id = card.id ? card.id : state.cards.length + index
			return {...card, id}
		});
		return {
			cards: [...newCards]
		}
	}),
    addCard: (card: CardInterface) => set((state) => {
		const id = card.id ? card.id : state.cards.length + 1;
		return {cards: [...state.cards, {...card, id}]}
    }),
    updateCard: (card: CardInterface) => set((state) => {
		const index = state.cards.findIndex(item => {
			return item.id === card.id;
		})
		state.cards[index] = card;
		return {cards: [...state.cards]}
    }),
    setLists: (lists:ListInterface[]) => set((state) => {
      	return {lists}
    }),
    addList: (list: ListInterface) => set((state)=> {
		return {
			lists: [
			...state.lists,
			list
			]
		}
    })
}))