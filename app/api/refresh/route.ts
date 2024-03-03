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

        cookies().set("auth-token", data["auth-token"]);
        cookies().set("refresh-token", data["refresh-token"], { httpOnly: true });

        return Response.json(data);
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            return Response.json({ error: error }, { status: error.response?.status });
        }
    }
}
