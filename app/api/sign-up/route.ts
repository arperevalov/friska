import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const requestData = await req.json();
        const request = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/sign-up`, requestData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await request.data;

        const now = new Date();
        const days = process.env.NEXT_PUBLIC_AUTH_TOKEN_EXPIRY_DAYS
            ? parseInt(process.env.NEXT_PUBLIC_AUTH_TOKEN_EXPIRY_DAYS, 10)
            : 5;
        const expires = now.getTime() + Math.round(days * 24 * 60 * 60 * 1000);
        cookies().set("auth-token", data.token, { expires });

        return Response.json(data);
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            return Response.json({ error: error }, { status: error.response?.status });
        }
    }
}
