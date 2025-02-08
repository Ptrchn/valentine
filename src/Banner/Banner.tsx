import React,{useEffect} from 'react'
import { Icon } from "@iconify/react";

interface BannerProps {
    dataBanner: string
    setDataBanner: (value:string) => void
    stateBanner: boolean
    setStateBanner: (value:boolean) => void
}


const Banner: React.FC<BannerProps>=({dataBanner, setDataBanner, stateBanner, setStateBanner}) =>{

    useEffect(() => {
        setTimeout(() => {
        setDataBanner('')
        }, 2000);
        setTimeout(() => {
            setStateBanner(false)
        }, 3000);
    }, [dataBanner])

  return (
    <>
        {stateBanner && 
        <div className='absolute top-0 left-0 w-full h-20 flex justify-center items-center z-10'>
            <div className={`${dataBanner === 'unlock' || dataBanner === 'sendMailSuccess' ?'':' transform translate-y-[-100px]'} bg-blue-300 text-white p-5 rounded-lg flex h-10 justify-center items-center gap-3 duration-300`}>
                {dataBanner === 'unlock' && 'ถูกต้องค้าบบ คนเก่ง '}
                {dataBanner === 'sendMailSuccess' && 'เค้าได้รับแล้วน้าา'}
                <Icon icon="bi:emoji-kiss-fill" width="16" height="16" />
            </div>
        </div>}
    </>
  )
}

export default Banner