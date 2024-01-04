import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const token = cookies().get("auth-token")?.value;
    try {
        const id = parseInt(params.id, 10);
        const request = await axios.put(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/cards/${id}/decrement`,
            {},
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            },
        );
        const data = await request.data;

        return Response.json(data);
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            return Response.json({ error: error }, { status: 500 });
        }
    }
}