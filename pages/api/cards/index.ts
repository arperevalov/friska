// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Units from "@/enums/Units";
import CardInterface from "@/interfaces/Card";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    cards: CardInterface[];
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(200).json({
        cards: [
            {
                id: 0,
                title: "Milk",
                expDate: new Date(),
                left: 1,
                units: Units.kg,
                listId: 0,
            },
            {
                id: 1,
                title: "sss",
                expDate: new Date(),
                left: 1,
                units: Units.l,
                listId: 1,
            },
            {
                id: 2,
                title: "sss1",
                expDate: new Date(),
                left: 1,
                units: Units.units,
                listId: 1,
            },
        ],
    });
}
