"use client"
import johnathmald from "@/public/johnathmald.png"
import { useEffect } from "react";
import { Application, Assets, Sprite } from "pixi.js";
import Board from "@/lib/game/board";
import Entity, { Direction } from "@/lib/game/entity";
import Tree, { TreeType } from "@/lib/game/structure/tree/tree";
import Tile, { TileType } from "@/lib/game/tile";
import Level from "@/lib/game/level";

export default function GameDisplay() {

    useEffect(() => {

        const pixiInit = async () => {

            const app = new Application();
            await app.init({ width: 780, height: 780 })
            document.getElementById("stageDiv")?.appendChild(app.canvas);

            const level = new Level(1, app)


        }

        pixiInit();

    }, [])

    return (
        <div id="stageDiv">

        </div>
    )
}