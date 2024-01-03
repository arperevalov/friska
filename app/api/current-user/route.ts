import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

export async function GET() {
    const token = cookies().get("auth-token")?.value;
    try {
        const request = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/current`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        const data = await request.data;

        return Response.json(data);
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            return Response.json({ error: "Server error" }, { status: error.status });
        }
    }
}
