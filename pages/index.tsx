import Head from 'next/head'
import { Card } from '@/components/Card'
import Header from '@/components/Header'
import CardInterface from '@/interfaces/Card'
import { useMainStore } from '@/store/MainStore'
import useLists from '@/hooks/useLists'
import useCards from '@/hooks/useCards'

export default function Home() {

  const { lists, cards } = useMainStore(store => store)

  useLists()
  useCards()

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
                  <h2 className='list__title'>{list.title}</h2>
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
