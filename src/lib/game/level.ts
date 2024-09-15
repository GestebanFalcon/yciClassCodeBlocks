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

    public app: Application;
    public board: Board;
    private number: number;
    private setup: Function;
    private removeListeners?: Function;

    constructor(number: number, app: Application) {
        this.app = app;
        this.number = number;
        this.setup = levels[number - 1];
        this.board = new Board(app);

        this.init();

    }
    async init() {
        await this.board.render();
        console.log("board rendered")
        this.removeListeners = await this.setup(this);

    }
    public async reload() {
        this.app.stage.removeChildren();
        this.removeListeners && this.removeListeners();
        this.board = new Board(this.app);
        await this.board.render();
        this.removeListeners = await this.setup(this);

    }
    public async renderBoard() {
        await this.board.render();
    }

}