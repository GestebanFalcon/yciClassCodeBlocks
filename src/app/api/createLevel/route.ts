import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(req: NextRequest) {
    const body = await req.json();
    //Not type checking allat until after college apps are done. "I'm tired of fighting with typescript. I'll do it later." - continune autofill. Continue is so fun.


    const { levelJSON }: {
        levelJSON: {
            tiles: {
                entities: {
                    maxHealth: number,
                    texture: string,
                    mainCharacter: boolean,
                }[],
                index: [number, number],
                structure?: {
                    texture: string,
                    treeType?: string,
                },
                texture: string
            }[],
            index: number,
            dimensions: [number, number]
        }
    } = body;

    const tileList = [];

    for (const tile of levelJSON.tiles) {
        const newTile = await prisma.tile.create({
            data: {
                index: tile.index,
                texture: tile.texture,
                entities: {
                    create: [
                        ...tile.entities
                    ]
                }
            }
        });
        tileList.push({ id: newTile.id });
    }

    const level = await prisma.level.create({
        data: {
            dimensions: levelJSON.dimensions,
            index: levelJSON.index,
            tiles: {
                connect: tileList
            }
        }
    });

    return NextResponse.json({ level }, { status: 201 });

}