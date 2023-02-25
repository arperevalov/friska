// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import CardInterface from '@/interfaces/Card'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  cards: CardInterface[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({cards: [
    {
      id: 0,
      title: 'Milk',
      expDate: '02.20.2023',
      left: 1,
      units: 'l',
      listId: 0
    },
    {
      id: 1,
      title : 'sss',
      expDate: '02.21.2023',
      left: 1,
      units: 'l',
      listId: 1,
    },
    {
      id: 2,
      title : 'sss1',
      expDate: '02.19.2023',
      left: 1,
      units: 'l',
      listId: 1,
    }
  ]})
}
