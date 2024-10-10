import Tile from "../../tile";
import Structure from "../structure";
import Fruit from "./fruit";

export enum TreeType {
    STRAWBERRY = "Strawberry",
    OAK = "Acorn",
    APPLE = "Apple",
    PEAR = "Pear"

}

export default class Tree extends Structure {

    private fruitCount: number;
    private type: TreeType;

    constructor({ texture, type }: { texture: string, type: TreeType }) {

        super({ texture })
        this.fruitCount = Math.round(Math.random() * 5) + 5;
        this.type = type;
        this.isTree = true;

    }

    public interact(): void {
        console.log("its a tree");
    }

    shake(): undefined | Fruit {
        if (this.fruitCount === 0) {
            return;
        }
        if (Math.random() < 0.5) {
            return;
        }
        this.fruitCount--;
        return (new Fruit({ type: this.type }));
    }


}