import Navbar from "@/components/navigation/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div id="infoLayout" className=" flex flex-col min-h-screen bg-gradient-to-r from-cyan-300 to-blue-300">

            <Navbar />
            <main className="">
                {children}
            </main>
        </div>
    )
}