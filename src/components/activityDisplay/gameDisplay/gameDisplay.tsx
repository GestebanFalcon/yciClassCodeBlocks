"use client"
import johnathmald from "@/public/johnathmald.png"
import { useEffect } from "react";
import { Application, Assets, Sprite } from "pixi.js";

export default function GameDisplay(){
    
    useEffect(() => {

        const pixiInit = async () => {

            const app = new Application();
            await app.init({width: 600, height: 600})
            document.getElementById("stageDiv")?.appendChild(app.canvas);
            await Assets.load("https://cdn.discordapp.com/attachments/756268999586873524/1247970134551691295/johnathmald.png?ex=6661f642&is=6660a4c2&hm=7e4ee13ba3ffe5427a49dfa512dc0c22dfeb88c6d9fd4e7fe16d2d57581de130&");
            let sprite = Sprite.from("https://cdn.discordapp.com/attachments/756268999586873524/1247970134551691295/johnathmald.png?ex=6661f642&is=6660a4c2&hm=7e4ee13ba3ffe5427a49dfa512dc0c22dfeb88c6d9fd4e7fe16d2d57581de130&");
            app.stage.addChild(sprite);


        }

        pixiInit();

    }, [])

    return(
        <div id="stageDiv">

        </div>
    )
}