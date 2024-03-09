import axios, { AxiosError } from "axios";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { link: string } }) {
    const { link } = params;
    try {
        const request = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/confirm/${link}`);
        const data = await request.data;

        return Response.json(data);
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            return Response.json({ error: error }, { status: error.response?.status });
        }
    }
}
