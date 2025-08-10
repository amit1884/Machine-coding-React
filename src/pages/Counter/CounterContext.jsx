import { createContext, useState } from "react"

export const CounterContext=createContext()

const CounterProvider=({children})=>{
    const [counter,setCounter]=useState(0)
    const [counter2,setCounter2]=useState(0)
      const incrementCount1 = () => setCounter(prev => prev + 1);
       const incrementCount2 = () => setCounter2(prev => prev + 1);
    return (
        <CounterContext.Provider value={{counter,counter2,incrementCount1,incrementCount2}}>
            {children}
        </CounterContext.Provider>
    )
}

export default CounterProvider