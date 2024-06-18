//3 types of tiles. Ground, Wall, Void. Each will have default texture. Void kills if traversed. Wall is impassible and blocks traversal.

import { Sprite } from "pixi.js";
import Entity from "./entity";

export enum TileType {
    GROUND = "GROUND",
    WALL = "WALL",
    VOID = "VOID"
}

export default class Tile {
    
    private sprite: Sprite;
    private tileType: TileType;
    private texture: string;
    private entityList: Entity[];

    constructor({type, textureURL, entities}: {type: TileType, textureURL?: string, entities?: Entity[]}){
        
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
            this.texture = "https://cdn.discordapp.com/attachments/769220443692990474/1248669859810771086/defaultGrassLarge.png?ex=6673026d&is=6671b0ed&hm=2268734132461515350b614d5f39d587e524446563d0774df5078691a434e1fb&"
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

    public getTexture(): string{
        return this.texture;
    }

    public boonkEntity(boonkedEntity: Entity) {
        const newEntityList = this.entityList.filter(e => (e !== boonkedEntity));
        this.entityList = newEntityList;
    }
    public addEntity(addedEntity: Entity) {
        this.entityList.push(addedEntity);
    }
    public getEntities(){
        return ([...this.entityList]);
    }
}