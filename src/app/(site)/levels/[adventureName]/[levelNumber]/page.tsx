import GameDisplay from "@/components/activityDisplay/gameDisplay/gameDisplay";

export default async function GameTest({ params }: { params: { levelNumber: number, adventureName: string } }) {

    return (

        <div className=" w-full h-full">
            <GameDisplay levelNumber={params.levelNumber} />
        </div>
    )
}