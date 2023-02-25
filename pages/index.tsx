import Head from 'next/head'
import { Card } from '@/components/Card'
import { create } from 'zustand'
import { useEffect } from 'react'
import Header from '@/components/Header'
import ListInterface from '@/interfaces/List'
import CardInterface from '@/interfaces/Card'

interface MainStoreInterface {
  lists: ListInterface[],
  cards: CardInterface[],
  setCards: CallableFunction,
  updateCard: CallableFunction,
  setLists: CallableFunction
}

export const useMainStore = create<MainStoreInterface>(set => ({
  lists: [],
  cards: [],
  setCards: (cards:CardInterface[]) => set((state) => {
    const newCards = cards.map( (card, index) => {
      const id = card.id ? card.id : state.cards.length + index
      return {...card, id}
    });
    return {cards: [...state.cards, ...newCards]}
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
  })
}))

export default function Home() {

  const { lists, cards, setCards, setLists } = useMainStore(store => store)

  useEffect(()=>{
    const requestLists = async () =>{
      const request = await fetch('/api/lists')
      const requestJSON = await request.json();
      setLists(requestJSON.lists)
    }
    
    const requestData = async ()=>{
      const request = await fetch('/api/cards')
      const requestJSON = await request.json();
      setCards(requestJSON.cards)
    }
    requestLists();
    requestData()
  },[])

  return (
    <>
      <Head>
        <title>Friska</title>
        <meta name="description" content="Storage management app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main>
        <div className="container">
          { lists?.length > 0 ? lists.map(list => {
            return (
              <div className="list" key={list.id}>
                <div className="list__header">
                  <h2 className='list__title h3'>{list.title}</h2>
                </div>
                <div className="list__items">
                  { cards.length > 0 ? cards.map((card: CardInterface) => {
                    if (card.listId === list.id) {
                      return (
                        <div key={card.id} className="list__item">
                          <Card {...card} />
                        </div>
                      )
                    }
                  }) : '' }
                </div>
              </div>
            )
          }) : '' }
        </div>
      </main>
    </>
  )
}
