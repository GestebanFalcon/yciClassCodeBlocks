import { Application, Sprite, Assets } from "pixi.js";
import Tile, { TileType } from "./tile";

// board will be generated as an array full of default tile blocks.
// board size is (Currently) 10x10 tiles of size 60px x 60px

export default class Board {

    public board: Tile[][] = [];

    constructor(){
        for (let i = 0; i < 13; i++){
            this.board[i] = [];
            for (let j = 0; j < 13; j++) {
                this.board[i][j] = new Tile({type: TileType.GROUND})
            }
        }
        return this;
    }

    public async render(app: Application){
        
        let currentTexture: string;
        let currentSprite;

        for (let i = 0; i < this.board.length; i++){
            for (let j = 0; j < this.board[i].length; j++){
                
                currentTexture = this.board[i][j].getTexture();
                await Assets.load(currentTexture);
                currentSprite = Sprite.from(currentTexture);
                currentSprite.x = i * 60;
                currentSprite.y = j * 60;
                app.stage.addChild(currentSprite);
            }
        }

    }

}