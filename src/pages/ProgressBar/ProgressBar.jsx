import { useEffect, useState } from 'react'
import './progressbar.css'
const ProgressBar=()=>{
    const [start,setStart]=useState(false)
    const [progress,setProgress]=useState(0)
    useEffect(()=>{
        let timer
       if(start && progress<100){
         timer=setInterval(()=>{
            setProgress((prev)=>prev+1)
        },1000)
       }
      return ()=>clearInterval(timer)
    })
    return (
        <div className='progressbar-container'>
            <h1>Progress bar</h1>
            <div className='bar'>
                <div className='progress' style={{width:`${progress}%`}}></div>
                <div className='prgress-value'>{progress}%</div>
            </div>
             <button onClick={()=>setStart(!start)} className='start-btn'>{start?'Pause':'Start'}</button>
        </div>
    )
}
export default ProgressBar