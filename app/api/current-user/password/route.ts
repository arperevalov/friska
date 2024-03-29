import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
    const token = cookies().get("auth-token")?.value;
    try {
        const requestData = await req.json();
        const request = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/current/`, requestData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        const data = await request.data;

        return Response.json(data);
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            return Response.json({ error: error }, { status: error.response?.status });
        }
    }
}
