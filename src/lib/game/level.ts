import { Application } from "pixi.js";
import Board from "./board";
import Entity from "./entity";
import Tree from "./structure/tree/tree";
import { TileType } from "./tile";
import Tile from "./tile";
import { TreeType } from "./structure/tree/tree";
import { Direction } from "./entity";
import levels from "./levels/levels";


export default class Level {

    app: Application;
    board: Board
    number: number
    setup: Function

    constructor(number: number, app: Application) {
        this.app = app;
        this.number = number;
        this.setup = levels[number - 1];

        this.board = new Board(this.app)

        const init = async () => {
            await this.board.render();

            await this.setup();
        }
        init();


    }


}