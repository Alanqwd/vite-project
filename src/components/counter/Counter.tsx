//Состояние 

import { useState } from "react";

export default function Counter(){

    const[counter, setCounter] = useState<number>(0);
    return(
        <div>

            <p>Count = {counter}</p>
            <button onClick={() => {
                setCounter(counter + 1 );
                console.log(counter);
            }}>Count++</button>

        </div>

)
}