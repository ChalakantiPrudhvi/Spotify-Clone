import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/frontend-assets/assets";

export const Playercontext = createContext();

const PlayercontextProvider = (props) => {
  const audioRef = useRef();
  const seekbg = useRef();
  const seekbar = useRef();

  const [track, settrack] = useState(songsData[0]);
  const [playStatus, setPlayerstatus] = useState(false);
  const [time, settime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  const play = () => {
    audioRef.current.play();
    setPlayerstatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayerstatus(false);
  };

//  const prev= async() =>{
//   if(track.id>0){
//     await settrack(track.id-1);
//     await audioRef.current.play();
//     setPlayerstatus(true);
//   }
//  }
//  const Next= async() =>{
//   if(track.id<songsData.length-1){
//     await settrack(track.id+1);
//     await audioRef.current.play();
//     setPlayerstatus(true);
//   }
//  }
const prev = async() => {
  if (track.id > 0) {
    settrack(songsData[track.id - 1]);
  
  }
};

const Next = async() => {
  if (track.id < songsData.length - 1) {
     settrack(songsData[track.id + 1]);
  
  }
};
useEffect(() => {
  if (!audioRef.current) return;

  const audio = audioRef.current;

  const playAudio = async () => {
    try {
      await audio.play();
      setPlayerstatus(true);
    } catch (err) {
      console.log("Play error:", err);
    }
  };

  playAudio();
}, [track]);
  const playwithId=async(id)=>{
    await settrack(songsData[id]);
    await audioRef.current.play();
    setPlayerstatus(true);
  }
  useEffect(() => {
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.ontimeupdate = () => {
          seekbar.current.style.width=(Math.floor(audioRef.current.currentTime/audioRef.current.duration*100))+"%";
          settime({
            currentTime: {
              second: Math.floor(audioRef.current.currentTime % 60),
              minute: Math.floor(audioRef.current.currentTime / 60),
            },
            totalTime: {
              second: Math.floor(audioRef.current.duration % 60),
              minute: Math.floor(audioRef.current.duration / 60),
            },
          });
        };
      }
    }, 1000);
  }, []);



  const seeksong = async(e)=>{
      audioRef.current.currentTime=((e.nativeEvent.offsetX/seekbg.current.offsetWidth)*audioRef.current.duration)
  }
  const contextvalue = {
    audioRef,
    seekbg,
    seekbar,
    track,
    settrack,
    playStatus,
    setPlayerstatus,
    time,
    settime,
    play,
    pause,
    playwithId,prev,Next,seeksong
  };
  return (
    <Playercontext.Provider value={contextvalue}>
      {props.children}
    </Playercontext.Provider>
  );
};
export default PlayercontextProvider;
