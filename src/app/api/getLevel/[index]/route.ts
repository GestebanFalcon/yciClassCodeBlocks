import prisma from "@/lib/prismadb";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { index: string } }) {

    console.log("getting yay")

    if (!params.index) {
        return NextResponse.json({ error: "Missing Data: index" }, { status: 400 });
    }

    const index = params.index;


    if (!(parseInt(index))) {
        return NextResponse.json({ error: "Invalid Data: index" }, { status: 400 });
    }
    const level = await prisma.level.findFirst({ where: { index: parseInt(index) } });

    console.log("level");
    console.log(level);
    if (!level) {
        return NextResponse.json({ error: "Level does not exist" }, { status: 404 });
    }

    return NextResponse.json({ levelJSON: level }, { status: 200 });
}