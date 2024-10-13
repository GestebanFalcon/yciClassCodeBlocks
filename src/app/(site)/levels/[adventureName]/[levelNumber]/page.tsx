import Display from "./display";



export default async function GameTest({ params }: { params: { levelNumber: number, adventureName: string } }) {




    return (
        <>
            <Display levelNumber={params.levelNumber} adventureName={params.adventureName} />



            {/* <GameDisplay levelNumber={params.levelNumber} />
            <Workspace /> */}
        </>
    )
}