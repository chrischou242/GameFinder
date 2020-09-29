import React, {useEffect, useState} from 'react';

import axios from 'axios'

import './ScreenSnap.css'


const ScreenSnap = props =>{
  const [screenShots, setScreenShots]= useState([])

    
useEffect(()=>{
    console.log(props.id)
    axios.get(`https://api.rawg.io/api/games/${props.id}/screenshots`)
    .then((res)=>{
        setScreenShots(res.data.results)
        console.log(props.id)
    })
    .catch((err)=>console.log(err))
}, [props.id])

return(
    <div className="imgs">
        {screenShots.map((shots)=>{
            return(
                <div className="screenshot" >
                <img src={shots.image}/> {""}
                </div>
            )
        })}
    </div>
)
}
export default ScreenSnap;