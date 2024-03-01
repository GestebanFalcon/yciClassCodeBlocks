interface attribute {
    name: string,
    value: string
}

export default function classBar({gameClass, setGameClass}: {gameClass: any, setGameClass: any}) {
    
    const updateAttributes = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
        e.preventDefault()
        const name = e.target.name;
        const value = e.target.value;
        const newAttributes = [...gameClass.attributes];
        newAttributes[i] = {name, value};
        setGameClass({...gameClass, attributes: newAttributes});
    }


    return(
        <div className="min-h-screen w-1/6 flex flex-col bg-slate-600 border-2 border-slate-400 p-4">
            <h1>{`Class name: ${gameClass.name}`}</h1>
            <ul className=" bg-slate-500 w-full ">
                {gameClass.attributes.map((attribute: attribute, index: number) => (
                    <li><span>{`${attribute.name}:`}<input name={attribute.name} value={attribute.value} onChange={(e) => updateAttributes(e, index)}/></span></li>
                ))}
            </ul>
        </div>
    )
}