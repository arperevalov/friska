import Head from 'next/head'
import { Card, CardInterface } from '@/components/Card'
import { create } from 'zustand'
import { useEffect } from 'react'

interface MainStoreInterface {
  cards: CardInterface[],
  setCards: CallableFunction
}

const useMainStore = create<MainStoreInterface>(set => ({
  cards: [
    {
      title : 'Milk',
      category: 'veggies',
      expDate: '02.02.2022',
      left: 1,
      measurement: 'l'
    }
  ],
  setCards: (card:CardInterface) => set((state) => {
    return {cards: [...state.cards, card]}
  })
}))

export default function Home() {

  const { cards, setCards } = useMainStore(store => store)

  useEffect(()=>{
      setCards({
        title : 'sss',
        category: 'veggies',
        expDate: '02.02.2022',
        left: 1,
        measurement: 'l'
      })
      setCards({
        title : 'sss1',
        category: 'veggies',
        expDate: '02.02.2022',
        left: 1,
        measurement: 'l'
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
      <main>
        <div className="container">
          <div className="list">
            { cards.length > 0 ? cards.map((i: CardInterface, index: number) => {
              return (
                <div key={index} className="list__item">
                  <Card card={i}/>
                </div>
              )
            }) : '' }
          </div>
        </div>
      </main>
    </>
  )
}
