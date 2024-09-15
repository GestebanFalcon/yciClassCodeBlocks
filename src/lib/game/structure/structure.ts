import { Application, Assets, Sprite } from "pixi.js";
import Tile from "../tile";

export default class Structure {

    public isTree: Boolean;
    private sprite?: Sprite;
    public interact(): void {
    };
    shake?(): any;
    private texture: string;

    constructor({ texture }: { texture: string }) {
        this.isTree = false;
        // this.tile = tile;
        this.texture = texture;
    }

    public async render({ app, x, y, width, height }: { app: Application, x: number, y: number, width: number, height: number }) {

        await Assets.load(this.texture);
        this.sprite = Sprite.from(this.texture);
        this.sprite.width = width;
        this.sprite.height = height;
        this.sprite.x = x;
        this.sprite.y = y;

        this.sprite.x += (width - this.sprite.width) / 2;
        this.sprite.y += (height - this.sprite.height) / 2;

        console.log(`${this.sprite.x}, ${this.sprite.y}, ${this.sprite.width}, ${this.sprite.height}`)
        app.stage.addChild(this.sprite);

    }



}  