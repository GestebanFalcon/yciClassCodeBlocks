import { Application, Sprite, Assets } from "pixi.js";
import Board from "./board";
import Fruit from "./structure/tree/fruit";
import Item from "./item";
import Tree from "./structure/tree/tree";

export enum Direction {
    UP,
    DOWN,
    RIGHT,
    LEFT
}

export default class Entity {

    private app: Application;
    private board: Board | undefined
    // reference value SHOULD allow direct manipulation of board. I know its really weird but trust
    private me: boolean
    private tileCoords: [number, number]
    private sprite!: Sprite;
    private texture: string;
    private health?: number;
    private maxHealth?: number;
    private inventory: Fruit[];
    private dimensions?: [number, number]

    constructor({ entityBoard, entityApp, entityTexture, me, startingCoords, entityMaxHealth, dimensions }: { entityBoard: Board, entityApp: Application, entityTexture: string, me: boolean, startingCoords?: [number, number], dimensions?: [number, number], entityMaxHealth?: number }) {

        if (dimensions) {
            this.dimensions = dimensions;
        }
        //if undefined is passed in as board, everthing breaks. So don't let it break please. It is solved by reloading the page i think though. Its client caused and only hurts the client idc.
        this.inventory = [];

        this.app = entityApp;
        if (entityMaxHealth) {
            this.maxHealth = entityMaxHealth;
            this.health = this.maxHealth;
        }

        this.me = me;
        this.board = entityBoard;
        if (startingCoords) {
            this.tileCoords = [...startingCoords];
        } else {
            this.tileCoords = [0, 0];
        }
        console.log(this.getTile());
        this.getTile()?.addEntity(this);
        this.texture = entityTexture;
        this.init(entityApp);

    }
    private async init(app: Application) {

        await Assets.load(this.texture);
        console.log("loaded texture of" + this);
        this.sprite = Sprite.from(this.texture);
        this.sprite.zIndex = 1

        // if (this.dimensions) {
        //     this.sprite.width = this.dimensions[0];
        //     this.sprite.height = this.dimensions[1];
        // }

        app.stage.addChild(this.sprite);
        console.log("Added child to stage");
        this.sprite.x = this.tileCoords[0] * 60;
        this.sprite.y = this.tileCoords[1] * 60;

        if (!this.me) {
            this.sprite.x += 20;
        }

    }
    private die() {
        this.app.stage.removeChild(this.sprite);
    }
    private spawn() {
        this.app.stage.addChild(this.sprite);
    }
    public takeDamage(damage: number) {
        if (!this.health) {
            return;

        }
        this.health -= damage;
        if (this.health < 0) {
            this.health = 0;
            this.die();
        }
    }
    public punch(damage: number) {
        const entities = this.getTile()?.getEntities()
        if (entities) {
            for (let i = 0; i < entities.length; i++) {
                if (entities[i] !== this) {
                    entities[i].takeDamage(damage);
                }
            }
        }
    }
    public eatSlot(invSlot: number) {
        if (this.inventory[invSlot]) {
            this.eat(this.inventory[invSlot]);
            this.inventory.splice(invSlot, 1);
        }
    }
    private eat(fruit: Fruit) {
        console.log("nom nom nom");
        if (!this.health || !this.maxHealth) {
            console.log('sad');
            return;
        }
        if (!fruit.isEdible()) {
            console.log("yucky");
            return;
        }
        this.health += fruit.getNutrition()!;
        // gotta trust me isEdible already checks for it
        if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }
        console.log("yum yum " + this.health);

    }
    public move(direction: Direction) {
        const distance = 60;
        const preCoords: [number, number] = [...this.tileCoords];
        this.getTile()?.boonkEntity(this);

        if (direction === Direction.RIGHT) {
            this.tileCoords[1]++;
            if (this.checkCoords(preCoords)) {
                this.sprite.x += distance;
            }
        }
        if (direction === Direction.LEFT) {
            this.tileCoords[1]--;
            if (this.checkCoords(preCoords)) {
                this.sprite.x -= distance;
            }
        }
        if (direction === Direction.UP) {
            this.tileCoords[0]--;
            if (this.checkCoords(preCoords)) {
                this.sprite.y -= distance;
            }
        }
        if (direction === Direction.DOWN) {
            this.tileCoords[0]++;
            if (this.checkCoords(preCoords)) {
                this.sprite.y += distance;
            }
        }

    }
    private checkCoords(preCoords: [number, number]): boolean {
        try {
            this.getTile()?.addEntity(this); //gettile doesnt work only when the entity is in the proecess of being removed from the program
            return true;
        } catch (err) {
            console.error("You cannot move out of bounds >:(");
            this.tileCoords = preCoords;
            return false;
        }
    }
    private getTile() {
        return (this.board?.board[this.tileCoords[0]][this.tileCoords[1]]);
        //might be the most awful line of code written
    }
    public getSprite() {
        return this.sprite;
    }
    public shakeTree() {

        console.log("shaking");

        if (this.getTile()?.structure?.shake) {

            console.log("is tree");

            const fruit = this.getTile()?.structure!.shake!();
            //typescript when i literally just checked for it O:
            if (fruit) {
                this.inventory.push(fruit);
                console.log(fruit);
                console.log(this.inventory);
            } else {
                console.log("no fruit :(");
            }


        }
    }
    public death() {
        //it should really have a board. it is definitely assigned in the constructor and can only be undefined after this or if i pass in undefined like an ape
        this.getTile()?.boonkEntity(this)
        this.board = undefined;
        this.app.stage.removeChild(this.sprite); //ill finish tomorrow. You still need to cut the cord with the tile and yteah. Look at the sheet. Cut the things it refers to then the things that refer to it if possible.
    }
}