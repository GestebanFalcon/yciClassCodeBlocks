import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const body = await req.json();
    const { message }: { message: string } = body;

    if (!message) {
        return NextResponse.json({ error: "Missing Data: message" }, { status: 400 });
    }

    const review = await prisma.review.create({
        data: {
            message: message
        }
    });

    return (NextResponse.json({ review }, { status: 201 }));
}