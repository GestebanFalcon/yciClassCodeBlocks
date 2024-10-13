import { Application } from "pixi.js";
import Board from "../board";
import Entity from "../entity";
import Tree from "../structure/tree/tree";
import { TileType } from "../tile";
import Tile from "../tile";
import { TreeType } from "../structure/tree/tree";
import { Direction } from "../entity";
import Level from "../level";

export default async (level: Level) => {
    const johnathmald = level.mainCharacter;

    console.log(johnathmald);

    const michael = new Entity({ entityMaxHealth: 30, entityBoard: level.board, entityApp: level.app, entityTexture: "https://i.postimg.cc/rmXbRc1v/johnathmald.png", me: false, startingCoords: [5, 5] });


    const jeremiah = new Tree({ texture: "https://png.pngtree.com/png-vector/20240208/ourmid/pngtree-green-tree-plant-forest-png-image_11716383.png", type: TreeType.STRAWBERRY, });
    const miranda = new Tile({ type: TileType.GROUND, structure: jeremiah, board: level.board });
    level.board.insertTile(3, 2, miranda);

    const moveListener = (e: KeyboardEvent) => {
        if (e.key === "w") {
            johnathmald.move("up");
        }
        if (e.key === "s") {
            johnathmald.move("down");
        }
        if (e.key === "a") {
            johnathmald.move("left");
        }
        if (e.key === "d") {
            johnathmald.move("right");
        }
        if (e.key === "f") {
            johnathmald.punch(20)
        }
        if (e.key === "r") {
            johnathmald.shakeTree();
        }
        if (e.key === "e") {
            johnathmald.eatSlot(0);
        }
        if (e.key === "l") {
            level.reload();
        }

    }

    document.addEventListener("keypress", moveListener);

    console.log(level.board);
    await level.renderBoard();
    return (() => {
        document.removeEventListener("keypress", moveListener);
    })
}