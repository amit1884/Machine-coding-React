import { useContext } from "react"
import  { CounterContext } from "./CounterContext"
import CounterProvider from "./CounterContext"

const Button=()=>{
    const { counter, incrementCount1 } = useContext(CounterContext)

    return (
         <button onClick={incrementCount1}>
                    Counter Value:  {counter}
         </button>
    )
}

const Button2=()=>{
    const { counter2, incrementCount2 } = useContext(CounterContext)

    return (
         <button onClick={incrementCount2}>
                    Counter Value:  {counter2}
         </button>
    )
}

const Counter = () => {
    return (
        <CounterProvider>
            <div>
                <h1>Counter with context</h1>
               <Button/>
               <Button2/>
            </div>
        </CounterProvider>
    )
}

export default Counter