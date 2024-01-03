import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const requestData = await req.json();
        const request = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/sign-in`, requestData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await request.data;
        cookies().set("auth-token", data.token);

        return Response.json(data);
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            return Response.json({ error: "Server error" }, { status: error.status });
        }
    }
}
