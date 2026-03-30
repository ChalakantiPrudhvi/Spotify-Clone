import React, { useContext } from 'react'
import Sidebar from './components/Sidebar.jsx';
import Player from './components/Player.jsx';
import Display from './components/Display.jsx';
import { Playercontext } from './context/Playercontext.jsx';
const App = () => {
  const {audioRef,track} = useContext(Playercontext)
  return (
    <div className='h-screen bg-black'>
      <div className='h-[90%] flex'>
         <Sidebar />
         <Display />
      </div>
      <Player />
   <audio ref={audioRef} src={track.file}></audio>
    </div>
  )
}

export default App
