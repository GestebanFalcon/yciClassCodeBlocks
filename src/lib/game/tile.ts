//3 types of tiles. Ground, Wall, Void. Each will have default texture. Void kills if traversed. Wall is impassible and blocks traversal.

import Entity from "./entity";

export enum TileType {
    GROUND = "GROUND",
    WALL = "WALL",
    VOID = "VOID"
}

export default class Tile {

    private tileType: TileType;
    private texture: string;
    private entityList: Entity[];

    constructor(type: TileType, textureURL?: string, entities?: Entity[]){

        this.tileType = type;

        if (entities) {
            this.entityList = [...entities];
        } else {
            this.entityList = [];
        }

        if (textureURL) {
            this.texture = textureURL;
            return this;
        }

        //still need to make links for sprite images. Potentially make them have references to a spritesheet instead of a url

        //should only run if no return earlier
        if (type === "GROUND") {
            this.texture = "/"
        }
        if (type === "WALL") {
            this.texture = "/"
        }
        if (type === "VOID") {
            this.texture = "/"
        } else {
            this.texture = "/"
        }

        return this;
    }

    

}