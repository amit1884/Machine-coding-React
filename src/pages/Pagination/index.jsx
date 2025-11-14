import { memo, useEffect, useState } from "react"

const Pagination=({total,page,setPage})=>{

    const [pages,setPages]=useState([])
    const generatePages=()=>{
        const temp=[...pages]
        if(total<=10){
            for(let i=0;i<10;i++){
                temp.push(i+1)
            }
            setPages(temp)
        }else{
        temp[0]='1'
        for(let i=1;i<9;i++){
            
        }
        temp[9]=total
        setPages(temp)
    }
    }
    useEffect(()=>{
        generatePages()
    },[page])
    return (
        <div>
            <div>Pagination</div>
            <div style={{display:'flex',gap:'10px'}}>
            {
                pages.map((item,idx)=>{
                    return (
                        <div>{item}</div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default memo(Pagination)