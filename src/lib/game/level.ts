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
    private setup?: Function;
    private removeListeners?: Function;
    public mainCharacter: Entity;

    constructor(number: number, app: Application, setIsComplete: Dispatch<SetStateAction<boolean>>, board?: Board,) {


        this.app = app;
        this.number = number;
        // if (levels[number - 1]) {
        //     this.setup = levels[number - 1];
        // } else {
        //     this.setup = levels[0];
        // }

        this.board = new Board({ app });
        this.mainCharacter = new Entity({ maxHealth: 30, board: this.board, app: this.app, texture: "https://i.postimg.cc/rmXbRc1v/johnathmald.png", me: true });
    }


    //eventually, setup will also include things such as configuring unique blockly setups and attaching them to their resultant outputs. These setups should not reload every time. 

    //Fuck what i just said. The blocks will be part of the level object itself passed into as an input. therefore they arent tied to the setup function and just chill there each time. The only thing that needs to change is the character they control as an input

    //FUCK YOU PAST ME THIS CODE IS DOGSHIT FUCK THE SETUP IM CONFIGURING THE BOARD FROM SCRATCH FROM AN OBJECT IN A DATABASE (mango phonk remix) man why is amber so mean like wtf man
    //and dont you know how sweet it tastes dont you know how sweet it tastes and dont you know how sweet it tastes now that im without yououuuuuuuuu i love newjeans

    async init() {
        await this.board.render();
        console.log("board rendered")
        this.setup && (this.removeListeners = await this.setup(this));

    }
    public async reload() {
        this.app.stage.removeChildren();
        this.removeListeners && this.removeListeners();
        setTimeout(async () => {
            this.board = new Board({ app: this.app });
            await this.board.render();
            this.setup && (this.removeListeners = await this.setup(this));
        }, 1000);


    }
    public async renderBoard() {
        await this.board.render();
    }
    public moveRight() {
        this.mainCharacter.move("right");
    }
    public getNumber() {
        return this.number;
    }
    public static fromJSON({ tiles, index, setIsComplete, dimensions }:
        {
            tiles: {
                entities: {
                    maxHealth: number,
                    texture: string,
                    mainCharacter: boolean,
                }[],
                index: [number, number],
                structure?: {
                    texture: string,
                    treeType?: string,
                },
                texture: string
            }[],
            index: number,
            setIsComplete: Dispatch<SetStateAction<boolean>>,
            dimensions: [number, number]
        }) {

        const app = new Application();
        const board = new Board({ app, tileList: tiles, dimensions });
        return new Level(index, app, setIsComplete, board);
    }
    public toJSON(): {
        tiles: {
            entities: {
                maxHealth: number,
                texture: string,
                mainCharacter: boolean,
            }[],
            index: [number, number],
            structure?: {
                texture: string,
                treeType?: string,
            },
            texture: string
        }[],
        index: number,
        dimensions: [number, number]
    } {

        const tileList: {
            entities: {
                maxHealth: number,
                texture: string,
                mainCharacter: boolean,
            }[],
            index: [number, number],
            structure?: {
                texture: string,
                treeType?: string,
            },
            texture: string
        }[] = []

        for (let i = 0; i < this.board.board.length; i++) {
            for (let j = 0; j < this.board.board[i].length; j++) {
                const currentTile = this.board.board[i][j];

                tileList.push(currentTile.toJSON([i, j]));
            }
        }

        return (
            {
                tiles: tileList,
                index: this.number,
                dimensions: [this.board.board.length, this.board.board[0].length]
            }
        )
    }

}

//this code is actually going to make me crash out its so bad.