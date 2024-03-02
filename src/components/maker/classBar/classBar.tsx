interface attribute {
    name: string,
    value: string
}

export default function ClassBar({gameClass, setGameClass}: {gameClass: any, setGameClass: any}) {
    
    const updateAttributes = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
        e.preventDefault()
        const name = e.target.name;
        const value = e.target.value;
        const newAttributes = [...gameClass.attributes];
        newAttributes[i] = {name, value};
        setGameClass({...gameClass, attributes: newAttributes});
    }


    return(
        <div className="min-h-screen w-3/12 flex flex-col bg-slate-500 border-2 border-slate-400 p-4">
            <h1>{`Class name: ${gameClass.name}`}</h1>
            <ul className=" bg-slate-600 w-full p-4">
                {gameClass.attributes.map((attribute: attribute, index: number) => (
                    <li key={index}>
                        <div className="grid grid-cols-2">
                            <span>{`${attribute.name}:`}</span>
                            <input name={attribute.name} value={attribute.value} onChange={(e) => updateAttributes(e, index)}/>
                        </div>
                    </li>   
                ))}
            </ul>
        </div>
    )
}