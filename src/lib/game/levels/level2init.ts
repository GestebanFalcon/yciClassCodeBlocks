import Level from "../level";
import { Direction } from "../entity";
import Entity from "../entity";

export default async (level: Level) => {
    const johnathmald = new Entity({ entityMaxHealth: 30, entityBoard: level.board, entityApp: level.app, entityTexture: "https://i.postimg.cc/rmXbRc1v/johnathmald.png", me: true, startingCoords: [1, 7] });

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
    })

    return (() => { })
}

