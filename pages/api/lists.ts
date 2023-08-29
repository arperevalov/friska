// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import ListInterface from "@/interfaces/List";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    lists: ListInterface[];
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(200).json({
        lists: [
            {
                title: "List #1",
                id: 0,
            },
            {
                title: "List #2",
                id: 1,
            },
        ],
    });
}
