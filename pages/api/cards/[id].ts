// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import CardInterface from "@/interfaces/Card";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    cards: CardInterface[];
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const id = req.query.id as string;

    if (id) {
        res.status(200).json({
            cards: [
                {
                    id: parseInt(id, 10),
                    title: id,
                    expDate: new Date(),
                    left: 1,
                    units: "l",
                    listId: 1,
                },
            ],
        });
    } else {
        res.status(200).json({ cards: [] });
    }
}
