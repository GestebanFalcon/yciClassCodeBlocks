import { Application } from "pixi.js";
import Board from "../board";
import Entity from "../entity";
import Tree from "../structure/tree/tree";
import { TileType } from "../tile";
import Tile from "../tile";
import { TreeType } from "../structure/tree/tree";
import { Direction } from "../entity";

export default async (gameboard: Board, app: Application) => {
    const johnathmald = new Entity({ entityMaxHealth: 30, entityBoard: gameboard, entityApp: app, entityTexture: "https://i.postimg.cc/rmXbRc1v/johnathmald.png", me: true });
    console.log(johnathmald);

    const michael = new Entity({ entityMaxHealth: 30, entityBoard: gameboard, entityApp: app, entityTexture: "https://i.postimg.cc/rmXbRc1v/johnathmald.png", me: false, startingCoords: [5, 5] });


    const jeremiah = new Tree({ texture: "https://i.postimg.cc/rmXbRc1v/johnathmald.png", type: TreeType.STRAWBERRY });
    const miranda = new Tile({ type: TileType.GROUND, structure: jeremiah });
    await gameboard.insertTile(3, 2, miranda);


    document.addEventListener("keypress", (e) => {
        if (e.key === "w") {
            johnathmald.move(Direction.UP);
        }
        if (e.key === "s") {
            johnathmald.move(Direction.DOWN);
        }
        if (e.key === "a") {
            johnathmald.move(Direction.LEFT);
        }
        if (e.key === "d") {
            johnathmald.move(Direction.RIGHT);
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
    })
}