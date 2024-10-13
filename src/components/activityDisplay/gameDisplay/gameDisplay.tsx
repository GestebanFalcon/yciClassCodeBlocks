"use client"
import johnathmald from "@/public/johnathmald.png"
import { useEffect, useState } from "react";
import { Application, Assets, Sprite } from "pixi.js";
import Board from "@/lib/game/board";
import Entity, { Direction } from "@/lib/game/entity";
import Tree, { TreeType } from "@/lib/game/structure/tree/tree";
import Tile, { TileType } from "@/lib/game/tile";
import Level from "@/lib/game/level";
import { useSearchParams } from "next/navigation";

export default function GameDisplay({ levelNumber }: { levelNumber: number }) {

    const [isComplete, setIsComplete] = useState(false);

    

    return (
        <div id="stageDiv">

        </div>  
    )
}