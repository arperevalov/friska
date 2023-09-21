// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import ListInterface from "@/interfaces/List";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    lists: ListInterface[];
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const id = req.query.id as string;

    if (id) {
        fetch(`http://localhost:3004/lists/${id}`,
        {
            method: req.method ? req.method : 'put',
            headers: req.body ? new Headers({ "content-type": "application/json" }) : undefined,
            body: req.body ? req.body : null,
        })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                res.status(200).json({lists: response});
            });
    } else {
        res.status(200).json({lists : []});
    }
}
