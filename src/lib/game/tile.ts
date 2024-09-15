//3 types of tiles. Ground, Wall, Void. Each will have default texture. Void kills if traversed. Wall is impassible and blocks traversal.

import defaultGrassLarge from "@/public/defaultGrassLarge.png";

import { Application, Assets, Sprite, TextureSourceLike } from "pixi.js";
import Entity from "./entity";
import Structure from "./structure/structure";
import Board from "./board";

export enum TileType {
    GROUND = "GROUND",
    WALL = "WALL",
    VOID = "VOID"
}

export default class Tile {

    public board: Board;
    public structure?: Structure;
    private sprite: Sprite;
    private tileType: TileType;
    private texture: any;
    private entityList: Entity[];

    constructor({ type, textureURL, entities, structure, board }: { structure?: Structure, type: TileType, textureURL?: string, entities?: Entity[], board: Board }) {

        this.board = board;
        if (structure) {
            this.structure = structure;
        }

        this.tileType = type;

        if (entities) {
            this.entityList = [...entities];
        } else {
            this.entityList = [];
        }

        if (textureURL) {
            this.texture = textureURL;
            this.sprite = Sprite.from(this.texture);
            return this;
        }

        //still need to make links for sprite images. Potentially make them have references to a spritesheet instead of a url

        //should only run if no return earlier
        this.texture = "/"
        if (type === TileType.GROUND) {
            this.texture = "https://i.postimg.cc/hjLY9wMh/default-Grass-Large.png";
        }
        if (type === TileType.WALL) {
            this.texture = "/"
        }
        if (type === TileType.VOID) {
            this.texture = "/"
        }

        this.sprite = Sprite.from(this.texture);
        return this;
    }

    public deRender() {
        this.board.app.stage.removeChild(this.sprite);
    }

    public async render(x: number, y: number, app: Application) {
        await Assets.load(this.texture);
        console.log(this.texture);
        this.sprite = Sprite.from(this.texture);

        this.sprite.x = x;
        this.sprite.y = y;


        app.stage.addChild(this.sprite);

        if (this.structure) {
            await this.structure.render({ app, x, y, width: this.sprite.width, height: this.sprite.height });
        }

    }

    public getTexture(): string {
        return this.texture;
    }

    public boonkEntity(boonkedEntity: Entity) {
        const newEntityList = this.entityList.filter(e => (e !== boonkedEntity));
        this.entityList = newEntityList;
    }
    public addEntity(addedEntity: Entity) {
        this.entityList.push(addedEntity);
    }
    public getEntities() {
        return ([...this.entityList]);
    }
}