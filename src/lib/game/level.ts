import { Application } from "pixi.js";
import Board from "./board";
import Entity from "./entity";
import Tree from "./structure/tree/tree";
import { TileType } from "./tile";
import Tile from "./tile";
import { TreeType } from "./structure/tree/tree";
import { Direction } from "./entity";
import levels from "./levels/levels";
import { Dispatch, SetStateAction } from "react";


export default class Level {

    public app: Application;
    public board: Board;
    private number: number;
    private setup: Function;
    private removeListeners?: Function;

    constructor(number: number, app: Application, setIsComplete: Dispatch<SetStateAction<boolean>>) {
        this.app = app;
        this.number = number;
        if (levels[number - 1]) {
            this.setup = levels[number - 1];
        } else {
            this.setup = levels[0];
        }

        this.board = new Board(app);

    }


    //eventually, setup will also include things such as configuring unique blockly setups and attaching them to their resultant outputs. These setups should not reload every time. 

    //Fuck what i just said. The blocks will be part of the level object itself passed into as an input. therefore they arent tied to the setup function and just chill there each time. The only thing that needs to change is the character they control as an input

    async init() {
        await this.board.render();
        console.log("board rendered")
        this.removeListeners = await this.setup(this);

    }
    public async reload() {
        this.app.stage.removeChildren();
        this.removeListeners && this.removeListeners();
        setTimeout(async () => {
            this.board = new Board(this.app);
            await this.board.render();
            this.removeListeners = await this.setup(this);
        }, 1000);


    }
    public async renderBoard() {
        await this.board.render();
    }

}