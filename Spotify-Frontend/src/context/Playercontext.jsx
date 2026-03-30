import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/frontend-assets/assets";

export const Playercontext = createContext();

const PlayercontextProvider = (props) =>{

     const audioRef = useRef();
     const seekbg = useRef();
     const seekbar = useRef();

const [track,settrack] = useState(songsData[0]);
const [playStatus,setPlayerstatus] = useState(false);
const [time,settime] = useState({
    currentTime:{
        second:0,
        minute:0
    },
    totalTime:{
        second:0,
        minute:0
    }
}); 


   const play=()=>{
    audioRef.current.play();
    setPlayerstatus(true);
   }

   const pause=()=>{
    audioRef.current.pause();
    setPlayerstatus(false);
   }
useEffect(() => {
  setTimeout(() => {
    if (audioRef.current) {

      audioRef.current.ontimeupdate = () => {
        settime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60)
          },
          totalTime: {
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60)
          }
        });
      };

    }
  }, 1000);
}, []);
    const contextvalue={
        audioRef,
        seekbg,
        seekbar,
        track,settrack,
        playStatus,setPlayerstatus,
        time,settime,play,pause
    }
    return(
        <Playercontext.Provider value={contextvalue}>
            {props.children}
        </Playercontext.Provider>
    )
}
export default PlayercontextProvider;