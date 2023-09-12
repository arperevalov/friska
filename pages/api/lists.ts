// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import ListInterface from "@/interfaces/List";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    lists: ListInterface[];
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    fetch("http://localhost:3004/lists")
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            res.status(200).json({ lists: response });
        });
}
