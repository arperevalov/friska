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

export async function POST(req: Request) {
    try {
        const requestData = await req.json();
        const request = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/lists`, requestData, {
            headers: {
                "Content-Type": "application/json",
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
