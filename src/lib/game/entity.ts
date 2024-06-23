import { Application, Sprite, Assets } from "pixi.js";
import Board from "./board";
import Fruit from "./structure/tree/fruit";
import Item from "./item";

export enum Direction {
    UP,
    DOWN,
    RIGHT,
    LEFT
}

export default class Entity {
    
    private app: Application;
    private board: Board
    // reference value SHOULD allow direct manipulation of board. I know its really weird but trust
    private me: boolean
    private tileCoords: [number, number]
    private sprite!: Sprite;
    private texture: string;
    private health?: number;
    private maxHealth?: number;
    private inventory: Item[];

    constructor({entityBoard, entityApp, entityTexture, me, startingCoords, entityMaxHealth}: {entityBoard: Board, entityApp: Application, entityTexture: string, me: boolean, startingCoords?: [number, number], entityMaxHealth?: number}){
        
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
        this.getTile().addEntity(this);
        this.texture = entityTexture;
        this.init(entityApp);

    }  
    private async init(app: Application){

        await Assets.load(this.texture);
        console.log("loaded texture of" + this);
        this.sprite = Sprite.from(this.texture);
        app.stage.addChild(this.sprite);
        this.sprite.x = this.tileCoords[0] * 60;
        this.sprite.y = this.tileCoords[1] * 60;

        if (!this.me) {
            this.sprite.x += 20;
        }

    }
    private die(){
        this.app.stage.removeChild(this.sprite);
    }
    private spawn(){
        this.app.stage.addChild(this.sprite);
    }
    public takeDamage(damage: number){
        if (!this.health){
            return;
            
        }
        this.health -= damage;
        if (this.health < 0){
            this.health = 0;
            this.die();
        } 
    }
    public punch(damage: number){
        const entities = this.getTile().getEntities()
        for (let i = 0; i < entities.length; i++){
            if (entities[i] !== this) {
                entities[i].takeDamage(damage);
            }
        }
    }
    public eat(fruit: Fruit){
        if (!this.health || !this.maxHealth){
            return;
        }
        if (!fruit.isEdible()){
            console.log("yucky");
            return;
        }
        this.health += fruit.getNutrition()!;
        // gotta trust me isEdible already checks for it
        if (this.health > this.maxHealth){
            this.health = this.maxHealth;
        }

    }
    public move(direction: Direction){
        const distance = 60;
        const preCoords: [number, number] = [...this.tileCoords];
        this.getTile().boonkEntity(this);

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
        try{
            this.getTile().addEntity(this);
            return true;
        } catch (err){
            console.error("You cannot move out of bounds >:(");
            this.tileCoords = preCoords;
            return false;
        }
    }
    private getTile(){
        return (this.board.board[this.tileCoords[0]][this.tileCoords[1]]);
         //might be the most awful line of code written
    }
    public getSprite(){
        return this.sprite;
    }
}