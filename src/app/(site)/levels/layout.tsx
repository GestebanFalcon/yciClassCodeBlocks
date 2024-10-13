import LevelNavbar from "@/components/navigation/levelNavbar"
import Navbar from "@/components/navigation/navbar"

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <div id="levelsLayout" className=" flex flex-col min-h-screen h-full bg-gradient-to-r from-cyan-300 to-blue-300">

            <LevelNavbar />
            <main className=" flex-grow">
                {children}
            </main>
        </div>
    )
}