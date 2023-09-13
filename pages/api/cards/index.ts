// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import CardInterface from "@/interfaces/Card";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    cards: CardInterface[];
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    console.log(req.body);
    fetch("http://localhost:3004/cards", {
        method: req.method ? req.method : "get",
        headers: new Headers({ "content-type": "application/json" }),
        body: req.body ? req.body : null,
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            res.status(200).json({ cards: response });
        });
}
