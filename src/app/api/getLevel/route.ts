import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(req: NextRequest) {

    const body = await req.json();
    const { index } = body;

    if (!index) {
        return NextResponse.json({ error: "Missing Data: index" }, { status: 400 });
    }

    const level = await prisma.level.findFirst({ where: { index } });

    if (!level) {
        return NextResponse.json({ error: "Level does not exist" }, { status: 404 });
    }

    return NextResponse.json({ level }, { status: 200 });
}