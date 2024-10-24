import Link from "next/link";

export default function LevelNavbar() {
    const levels = [1, 2, 3, 4, 5]
    return (
        <nav className="flex h-20 w-full bg-sky-200 shadow-md">
            <div id="links" className="ml-12 mr-auto h-full flex justify-center items-center text-yellow-500 text-xl"> <Link href="/levels/editor/?levelNumber=1">Edit</Link></div>
            <div className=" h-full p-4">
                <div className="w-20 bg-slate-400 h-full mx-auto rounded-full border-blue-950 border-2 flex ">
                    {levels.map(level => (
                        <Link href={`/levels/beta/${level}`} className="rounded-full p-2 border-2 font-semibold">{level}</Link>
                    ))}
                </div>
            </div>
            <div id="userActions" className="w-48 h-full ml-auto">
            </div>
        </nav>
    )
}