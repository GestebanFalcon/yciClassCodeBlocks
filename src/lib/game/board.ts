import Tile, { TileType } from "./tile";

// board will be generated as an array full of default tile blocks.
// board size is (Currently) 15x15 tiles

export default class Board {

    public board: Tile[][] = [];

    constructor(){
        for (let i = 0; i < 15; i++){
            this.board[i] = [];
            for (let j = 0; j < 15; j++) {
                this.board[i][j] = new Tile(TileType.GROUND)
            }
        }

    }


}