"use client"
import johnathmald from "@/public/johnathmald.png"
import { useEffect } from "react";
import { Application, Assets, Sprite } from "pixi.js";
import Board from "@/lib/game/board";
import Entity, { Direction } from "@/lib/game/entity";

export default function GameDisplay(){
    
    useEffect(() => {

        const pixiInit = async () => {

            const app = new Application();
            await app.init({width: 780, height: 780})
            document.getElementById("stageDiv")?.appendChild(app.canvas);

            const gameBoard = new Board();
            await gameBoard.render(app);
            
            const johnathmald = new Entity({entityBoard: gameBoard, entityApp: app, entityTexture: "https://cdn.discordapp.com/attachments/756268999586873524/1247970134551691295/johnathmald.png?ex=667319c2&is=6671c842&hm=93ef1cc00aa35a8850856f708af39caa266a8ebc720b0e998d18832e6fb1ce1a&", me: true});
            const michael = new Entity({entityMaxHealth: 30, entityBoard: gameBoard, entityApp: app, entityTexture: "https://cdn.discordapp.com/attachments/1197378900779610183/1252738343851135037/Michael.png?ex=66734eff&is=6671fd7f&hm=da2288f12cfc0bf72fc8bb03ffeb122ea6a4f847dead4ba1fa0d29af0d506890&", me: false, startingCoords: [5, 5]});
            document.addEventListener("keypress", (e) => {
                if (e.key === "w") {
                    johnathmald.move(Direction.UP);
                }
                if (e.key === "s"){
                    johnathmald.move(Direction.DOWN);
                }
                if (e.key === "a"){
                    johnathmald.move(Direction.LEFT);
                }
                if (e.key === "d"){
                    johnathmald.move(Direction.RIGHT);
                }
                if (e.key === "f") {
                    johnathmald.punch(20)
                }
            })

            

        }

        pixiInit();

    }, [])

    return(
        <div id="stageDiv">

        </div>
    )
}