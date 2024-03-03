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

        const tokenAuth = data["auth-token"];
        const expiresAuth = data["auth-token-exp"];
        const tokenRefresh = data["refresh-token"];
        const expiresRefresh = data["refresh-token-exp"];

        cookies().set("auth-token", tokenAuth, { expires: expiresAuth });
        cookies().set("refresh-token", tokenRefresh, { expires: expiresRefresh, httpOnly: true });

        return Response.json(data);
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            return Response.json({ error: error }, { status: error.response?.status });
        }
    }
}
