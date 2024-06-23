import { Application, Sprite, Assets } from "pixi.js";
import Tile, { TileType } from "./tile";

// board will be generated as an array full of default tile blocks.
// board size is (Currently) 10x10 tiles of size 60px x 60px

export default class Board {

    private app: Application;
    public board: Tile[][] = [];

    constructor(app: Application){
        this.app = app
        for (let i = 0; i < 13; i++){
            this.board[i] = [];
            for (let j = 0; j < 13; j++) {
                this.board[i][j] = new Tile({type: TileType.GROUND});
            }
        }
        return this;
    }

    public async render(){
        
        for (let i = 0; i < this.board.length; i++){
            for (let j = 0; j < this.board[i].length; j++){
                
                this.board[i][j].render(i * 60, j * 60, this.app);

            }
        }

    }
    public async insertTile(i: number, j: number, tile: Tile){
        
        this.board[i][j] = tile;
        this.board[i][j].render(j*60, i*60, this.app);

    }

}