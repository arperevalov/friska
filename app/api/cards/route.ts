import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

export async function GET() {
    const token = cookies().get("auth-token")?.value;
    try {
        const request = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/cards`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        const data = await request.data;

        return Response.json(data);
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            return Response.json({ error: error}, { status: 500 });
        }
    }
}

export async function POST(req: Request) {
    const token = cookies().get("auth-token")?.value;
    try {
        const requestData = await req.json();
        const request = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/cards`, requestData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        const data = await request.data;

        return Response.json(data);
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            return Response.json({ error: error}, { status: 500 });
        }
    }
}
