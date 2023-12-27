import axios, { AxiosError } from "axios";

export async function GET() {
    try {
        const request = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/lists`);
        const data = await request.data;

        return Response.json(data);
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            return Response.json({ error: "Server error" }, { status: error.status });
        }
    }
}
