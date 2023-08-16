// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import CardInterface from '@/interfaces/Card'
import type { NextApiRequest, NextApiResponse } from 'next'
import { useRouter } from 'next/router'

type Data = {
  cards: CardInterface[]
}

export default function handler(
  req: any,
  res: NextApiResponse<Data>
) {
  const id = req.query.id;

  if (id) {
    res.status(200).json({cards: [
      {
        id: 0,
        title: 'Milky Shakey',
        expDate: '02.20.2023',
        left: 1,
        units: 'l',
        listId: 1
      }
    ]})
  } else {
    res.status(200).json({cards: [
    ]})
  }
}