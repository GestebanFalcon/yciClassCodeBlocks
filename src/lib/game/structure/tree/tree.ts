import Tile from "../../tile";
import Structure from "../structure";
import Fruit from "./fruit";

export enum TreeType {
    STRAWBERRY = "Strawberry",
    OAK = "Acorn"

}

export default class Tree implements Structure {

    private fruitCount: number;
    private type: TreeType;
    tile: Tile;
    texture: string;

    constructor({tile, type}: {tile: Tile, type: TreeType}){

        this.fruitCount = Math.round(Math.random() * 5) + 5;
        this.type = type;
        this.tile = tile;
        this.texture = "";

    }

    public interact(): void {
        console.log("its a tree")
    }

    shake(): undefined | Fruit {
        if (this.fruitCount === 0) {
            return;
        }
        if (Math.random() < 0.5) {
            return;
        }
        this.fruitCount --;
        return (new Fruit({type: this.type}));
    }
    

}