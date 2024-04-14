interface Attribute {
    name: string,
    value: string
}

interface Method {
    name: string,
    
}


// a bar to potentially update classes/objects for the kids to experiment with. I still don't know exactly how this could be implemented to teach them in a game format,
// It works to update a state object that you can add "attributes" to. It works by adding an "attribute" object to an array with a name and value (like a key value pair, but I can iterate through all of them)

export default function ClassBar({gameClass, setGameClass}: {gameClass: any, setGameClass: any}) {
    
    const updateAttributes = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
        e.preventDefault()
        const name = e.target.name;
        const value = e.target.value;
        const newAttributes = [...gameClass.attributes];
        newAttributes[i] = {name, value};
        setGameClass({...gameClass, attributes: newAttributes});
    }

    const testDelete = () => {
        console.log('Delete Button Pressed');
        return;
    }


    return(
        <div className="min-h-screen w-3/12 flex flex-col bg-slate-500 border-2 border-slate-400 p-4">
            <h1 className="text-center">{`Class name: ${gameClass.name}`}</h1>
            <ul className=" bg-slate-600 w-full p-4 my-4">
                {gameClass.attributes.map((attribute: Attribute, index: number) => (
                    <li className=" my-1" key={index}>

                            <span className=" inline-block w-3/12"><span className=" flex justify-center">{`${attribute.name}:`}</span></span>
                            <input className="text-center w-7/12 bg-slate-500  focus:outline-none" name={attribute.name} value={attribute.value} onChange={(e) => updateAttributes(e, index)}/>
                            <span className="inline-block w-2/12">
                            <span className="flex justify-center">
                                <button className=" h-full w-6 rounded-full bg-gradient-to-r from-red-800 to-pink-700" onClick={testDelete}>X</button>
                            </span>
                            </span>

                    </li>   
                ))}
            </ul>

            <ul className=" bg-slate-500 w-full p-4 my-4">
                    {gameClass.methods.map(() => {
                        
                    })}
            </ul>
        </div>
    )
}