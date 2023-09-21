// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import CardInterface from "@/interfaces/Card";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    cards: CardInterface[];
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const id = req.query.id as string;

    if (id) {
        fetch(`http://localhost:3004/cards/${id}`, {
            method: "delete",
        })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                res.status(200).json({ cards: response });
            });
    } else {
        res.status(200).json({ cards: [] });
    }
}
