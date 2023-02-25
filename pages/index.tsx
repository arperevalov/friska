import Head from 'next/head'
import { Card, CardInterface } from '@/components/Card'
import { create } from 'zustand'
import { useEffect } from 'react'
import Header from '@/components/Header'

export interface List {
  title: string,
  id: number
}

interface MainStoreInterface {
  lists: List[],
  cards: CardInterface[],
  setCards: CallableFunction,
  updateCard: CallableFunction
}

export const useMainStore = create<MainStoreInterface>(set => ({
  lists: [{
    title: 'something',
    id: 0
  },
  {
    title: 'supersomething',
    id: 1
  }],
  cards: [
    {
      id: 0,
      title: 'Milk',
      category: 'veggies',
      expDate: '02.20.2023',
      left: 1,
      units: 'l',
      listId: 0
    }
  ],
  setCards: (card:CardInterface) => set((state) => {
    const newCard = {...card, id: state.cards.length}
    return {cards: [...state.cards, newCard]}
  }),
  updateCard: (card: CardInterface) => set((state) => {
    const index = state.cards.findIndex(item => {
      return item.id === card.id;
    })
    state.cards[index] = card;
    return {cards: [...state.cards]}
  })
}))

export default function Home() {

  const { lists, cards, setCards } = useMainStore(store => store)

  useEffect(()=>{
      setCards({
        title : 'sss',
        category: 'veggies',
        expDate: '02.21.2023',
        left: 1,
        units: 'l',
        listId: 1,
      })
      setCards({
        title : 'sss1',
        category: 'veggies',
        expDate: '02.19.2023',
        left: 1,
        units: 'l',
        listId: 1,
      })
  },[])

  return (
    <>
      <Head>
        <title>stor+</title>
        <meta name="description" content="Storage management app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main>
        <div className="container">
          { lists.length > 0 ? lists.map(list => {
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
