import { Application, Assets, Sprite } from "pixi.js";
import Tile from "../tile";

export default class Structure{

    private tile: Tile;
    private sprite?: Sprite;
    public interact(): void {
    }
    private texture: string;

    constructor({tile, texture}: {tile: Tile, texture: string}){
        this.tile = tile;
        this.texture = texture;
    }

    public async render({app, x, y, width, height}: {app: Application, x: number, y: number, width: number, height: number}) {

        await Assets.load(this.texture);
        this.sprite = Sprite.from(this.texture);
        this.sprite.x = x;
        this.sprite.y = y;

        this.sprite.x += (width - this.sprite.width) / 2;
        this.sprite.y += (height - this.sprite.height) / 2;

        app.stage.addChild(this.sprite);

    }



}  