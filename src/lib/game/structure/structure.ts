import Tile from "../tile";

export default interface Structure{

    tile: Tile;
    interact(): void;
    texture: string;

}  