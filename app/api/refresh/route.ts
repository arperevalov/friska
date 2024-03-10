import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

export async function GET() {
    const token = cookies().get("refresh-token")?.value;
    try {
        const request = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh`, {
            headers: {
                "Cookie": `refresh-token=${token};`,
            },
        });

        const data = await request.data;

        const tokenAuth = data["auth-token"];
        const maxAgeAuth = data["auth-token-exp"];
        const tokenRefresh = data["refresh-token"];
        const maxAgeRefresh = data["refresh-token-exp"];
        const confirmed = data["confirmed"];

        cookies().set("auth-token", tokenAuth, { maxAge: maxAgeAuth });
        cookies().set("refresh-token", tokenRefresh, { maxAge: maxAgeRefresh, httpOnly: true });
        cookies().set("confirmed", confirmed, { maxAge: maxAgeRefresh, httpOnly: true });

        return Response.json(data);
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            return Response.json({ error: error }, { status: error.response?.status });
        }
    }
}
