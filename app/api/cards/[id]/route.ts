import axios, { AxiosError } from "axios";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id, 10);
        const request = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/cards?id=${id}`);
        const data = await request.data[0];

        return Response.json(data);
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            return Response.json({ error: "Server error" }, { status: error.status });
        }
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id, 10);
        const requestData = await req.json();
        const request = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/cards/${id}`, requestData, {
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

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id, 10);
        const request = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/cards/${id}`);
        const data = await request.data;

        return Response.json(data);
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            return Response.json({ error: "Server error" }, { status: error.status });
        }
    }
}