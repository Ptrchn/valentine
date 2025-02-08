import { useState, useEffect, useRef } from 'react'
import Banner from './Banner/Banner'
import IntroPage from './Intro/IntroPage'
import Main from './Main/Main'
import BGM from '../public/assets/sounds/BGM.mp4'
import { Icon } from '@iconify/react'


import bgImg from '../public/assets/images/bg.jpg'



function App() {

  const [statePage, setStatePage] = useState(0) // 0 = intro, 1 = main
  const [stateBanner, setStateBanner] = useState(false) // true = show, false = hide
  const [dataBanner, setDataBanner] = useState('')
  const [password, setPassword] = useState({
    day:'',
    month:'',
    year:'',
  })
  const [souldPlay, setSouldPlay] = useState(true)
  const [soundScale, setSoundScale] = useState(0.5)
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = soundScale;  // Set volume to 20%
    }
  }, [soundScale]);

  useEffect(() => {
    if (audioRef.current) {
      if (souldPlay) {
        audioRef.current.play(); // Play audio if souldPlay is true
      } else {
        audioRef.current.pause(); // Pause audio if souldPlay is false
      }
    }
  }, [souldPlay]);
  const [smallMedia, setSmallMedia] = useState(false)
  useEffect(() => {
    const handleResize = () => {
      setSmallMedia(window.innerWidth < 640);
    };

    // ตรวจสอบขนาดจอเมื่อโหลดครั้งแรก
    handleResize();

    // เพิ่ม event listener เพื่ออัปเดตค่าทุกครั้งที่ขนาดจอเปลี่ยน
    window.addEventListener("resize", handleResize);

    // ลบ event listener เมื่อ component ถูก unmount
    return () => window.removeEventListener("resize", handleResize);

  }, []);

  return (

    <div 
      style={{
        backgroundImage: `url(${bgImg})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center'
      }}
      className='flex justify-center items-center w-screen h-screen overflow-hidden relative'>
        <audio 
        autoPlay={souldPlay}
        ref={audioRef} 
        id="bgm"
        loop>
          <source src={BGM} type="audio/mp3" />
        </audio>
        {!smallMedia && <div className='fixed right-16 sm:bottom-20 bottom-5 h-20 z-50 flex justify-center items-center gap-3'>
          
          <div className='flex justify-center items-center gap-1'>
          <div>{Math.round(soundScale * 100)}</div>
          <input
            type="range"
            min={0}
            max={100}
            maxLength={2}
            value={Math.round(soundScale * 100)}
            onChange={(e)=>setSoundScale(Math.round(e.target.valueAsNumber) / 100)}
            className="h-10 slider"
          />
          </div>
          <Icon 
          icon={souldPlay ? "solar:pause-bold":"solar:play-bold"}
          style={{backgroundColor: '#cad5f4'}}
          onClick={()=>setSouldPlay(!souldPlay)}
          width="25" height="25" className=' absolute right-[37px] bottom-7 z-50 text-blue-400 rounded-full cursor-pointer' />
          <Icon 
          icon="duo-icons:disk" width="100" height="100"
          onClick={()=>setSouldPlay(!souldPlay)}
          className={`text-blue-400 cursor-pointer ${souldPlay ? 'rotate' : ''}`} />
        </div>}
      <Banner dataBanner={dataBanner} setDataBanner={setDataBanner} stateBanner={stateBanner} setStateBanner={setStateBanner}/>
      {statePage === 0 && <IntroPage password={password} setPassword={setPassword} setStatePage={setStatePage} setStateBanner={setStateBanner} setDataBanner={setDataBanner}/>}
      {statePage === 1 && <Main/>}
    </div>
  )
}

export default App