import React,{ useState, useEffect } from 'react'
import Img11 from '../../public/assets/images/11.png'
import Img3 from '../../public/assets/images/3.png'
import Img1 from '../../public/assets/images/1.png'
import Img2 from '../../public/assets/images/2.png'
import Img8 from '../../public/assets/images/8.png'
import Img9 from '../../public/assets/images/9.png'
import Img10 from '../../public/assets/images/10.png'
import Img5 from '../../public/assets/images/5.png'
import Img13 from '../../public/assets/images/13.png'
import Img7 from '../../public/assets/images/7.png'

import P1 from '../../public/assets/images/P1.jpg'
import P2 from '../../public/assets/images/P2.jpg'
import P3 from '../../public/assets/images/P3.jpg'
import uploaded_images from '../../uploaded_images.json'




import { Icon } from "@iconify/react";


interface MainProps {
    
 }

const Main:React.FC<MainProps>=()=> {

const [stateMain, setStateMain] = useState(0)
const [selectImg, setSelectImg] = useState<number | null>(2)
const [selectImgOn, setSelectImgOn] = useState(false)

const numPhotos = uploaded_images.length - 1;

const [urlCol1, setUrlCol1] = useState<string[]>([])
const [urlCol2, setUrlCol2] = useState<string[]>([])
const [urlCol3, setUrlCol3] = useState<string[]>([])


const handlePopup = () => { 
    setSelectImgOn(false)
    setTimeout(()=>{setSelectImg(null)}, 300)
}
const [countYear, setCountYear] = useState(0)
const [countMonth, setCountMonth] = useState(0)
const [countDay, setCountDay] = useState(0)
const [smallMedia, setSmallMedia] = useState(window.innerWidth < 640);


useEffect(() => {
    const countYearMonthDay = () => {
      const dateNow = new Date();
      const dateInput = new Date("2024-09-05");

      let years = dateNow.getFullYear() - dateInput.getFullYear();
      let months = dateNow.getMonth() - dateInput.getMonth();
      let days = dateNow.getDate() - dateInput.getDate();

      // ถ้าวันติดลบ ให้ย้อนเดือน
      if (days < 0) {
        months -= 1;
        const prevMonth = new Date(dateNow.getFullYear(), dateNow.getMonth(), 0);
        days += prevMonth.getDate();
      }

      // ถ้าเดือนติดลบ ให้ย้อนปี
      if (months < 0) {
        years -= 1;
        months += 12;
      }

      setCountYear(years);
      setCountMonth(months);
      setCountDay(days);
    };

    countYearMonthDay();

    const newUrlCol1 = [...urlCol2];
    for (let i = 0; i < uploaded_images.length; i+=3) {
        newUrlCol1.push(uploaded_images[i].url);
    }
    setUrlCol1(newUrlCol1);

    const newUrlCol2 = [...urlCol2];
    for (let i = 1; i < uploaded_images.length; i+=3) {
        newUrlCol2.push(uploaded_images[i].url);
    }
    setUrlCol2(newUrlCol2);

    const newUrlCol3 = [...urlCol2];
    for (let i = 2; i < uploaded_images.length; i+=3) {
        newUrlCol3.push(uploaded_images[i].url);
    }
    setUrlCol3(newUrlCol3);

    for (let i = 0; i < uploaded_images.length; i++) {
        const img = new Image();
        img.src = uploaded_images[i].url;
    }



    
  }, []);

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


  const [timeDiff, setTimeDiff] = useState({
    totalDays: 0,
    remainingHours: 0,
    remainingMinutes: 0,
    remainingSeconds: 0,
  });

  const calculateTimeDifference = () => {
    const dateNow = new Date();
    const dateStart = new Date("2024-09-05T21:30:00");

  
    // คำนวณความแตกต่างเป็น milliseconds
    const diffTime = dateNow.getTime() - dateStart.getTime();
  
    // แปลงเป็นจำนวนวันทั้งหมด (ปัดลง)
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
    // หาจำนวนชั่วโมงที่เกินจากวัน
    const remainingHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
    // หาจำนวนนาทีที่เกินจากชั่วโมง
    const remainingMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  
    // หาจำนวนวินาทีที่เกินจากนาที
    const remainingSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);
  
    return {
      totalDays,
      remainingHours,
      remainingMinutes,
      remainingSeconds,
    };
  };

  useEffect(() => {
    const updateDiff = () => {
      setTimeDiff(calculateTimeDifference());
    };

    updateDiff();

    // ตั้งค่าให้คำนวณใหม่ทุกวินาที (อัปเดตค่า real-time)
    const interval = setInterval(updateDiff, 1000);

    return () => clearInterval(interval);
  }, []);


    


  const loadImagesSequentially = async () => {
      for (let i = 0; i < urlCol1.length; i++) {
          const img = new Image();
          img.src = urlCol1[i];
          await new Promise<void>((resolve) => {
              img.onload = () => {
                  resolve();
              };
              img.onerror = () => resolve(); // ถ้ามีข้อผิดพลาดจะทำให้โหลดต่อไป
          });
      }
  };
  const loadImagesSequentially2 = async () => {
    for (let i = 0; i < urlCol2.length; i++) {
        const img = new Image();
        img.src = urlCol2[i];
        await new Promise<void>((resolve) => {
            img.onload = () => {
                resolve();
            };
            img.onerror = () => resolve; // ถ้ามีข้อผิดพลาดจะทำให้โหลดต่อไป
        });
    }
};
const loadImagesSequentially3 = async () => {
    for (let i = 0; i < urlCol3.length; i++) {
        const img = new Image();
        img.src = urlCol3[i];
        await new Promise<void>((resolve) => {
            img.onload = () => {
                resolve();
            };
            img.onerror = () => resolve; // ถ้ามีข้อผิดพลาดจะทำให้โหลดต่อไป
        });
    }
};

  // เรียกใช้ฟังก์ชันเมื่อต้องการให้โหลด
  useEffect(() => {
      loadImagesSequentially();
      loadImagesSequentially2();
      loadImagesSequentially3();


  }, []);


  return (
    <>
    <div className={`sm:w-[600px] w-80 h-[500px] sm:mt-0 mt-28 relative flex justify-center items-center`}>
        {stateMain !== 0 && 
        <div 
        onClick={()=>setStateMain(1)}
        className={`absolute left-5 bg-white rounded-t-xl h-[100px] w-20 z-10  flex flex-col justify-center items-center cursor-pointer duration-200 gap-3 pt-2 hover:bg-blue-300 hover:text-white  ${stateMain !== 3? stateMain === 1 ?'top-[-95px]':' hover:translate-y-[-25px] top-[-70px] hover:gap-0':'sm:top-[-170px] top-[-70px] hover:translate-y-[-25px] hover:gap-0'} ${stateMain === 1 ?'border-2 border-blue-300':'border-blue-300'}`}>
            <img src={Img9} alt="img" className='w-11/12 object-contain rotate-12'/>
            <div>PostCard</div>
        </div>}
        {stateMain !== 0 && 
        <div 
        onClick={()=>setStateMain(2)}
        className={`absolute left-[105px] bg-white rounded-t-xl h-[100px] w-20 z-10  flex flex-col justify-center items-center cursor-pointer duration-200 gap-3 pt-2 hover:bg-blue-300 hover:text-white ${stateMain !== 3? stateMain === 2 ?'top-[-95px]':' hover:translate-y-[-25px] top-[-70px] hover:gap-0':'sm:top-[-170px] top-[-70px] hover:translate-y-[-25px] hover:gap-0'} ${stateMain === 2 ?'border-2 border-blue-300':'border-blue-300'}`}>
            {/* <img src={Img12} alt="img" className='w-7/12 object-contain'/> */}
            <img src={Img13} alt="img" className='w-6/12 object-contain'/>
            <div>Time</div>
        </div>}
        {stateMain !== 0 && 
        <div 
        onClick={()=>setStateMain(3)}
        className={`absolute left-[190px] bg-white rounded-t-xl h-[100px] w-20 z-10  flex flex-col justify-center items-center cursor-pointer duration-200 gap-3 pt-2 hover:bg-blue-300 hover:text-white ${stateMain !== 3? 'top-[-70px] hover:translate-y-[-25px] hover:gap-0':'sm:top-[-195px] top-[-95px]'} ${stateMain === 3 ?'border-2 border-blue-300':'border-blue-300'}`}>
            <img src={Img10} alt="img" className='w-10/12 object-contain rotate-12'/>
            <div>Memory</div>
        </div>}
        {stateMain === 0 && 
        <div 
        onClick={()=>setStateMain(1)}
        className=' absolute sm:bottom-2 bottom-[-60px] right-5 sm:right-[-50px] bg-white shadow sm:rounded-r-xl rounded-b-xl h-[80px] w-20 z-10 flex sm:justify-end justify-center sm:items-center items-end sm:pr-1 sm:pb-0 pb-3 duration-300 text-blue-300 cursor-pointer sm:hover:translate-x-5 sm:hover:pr-3'>
            <Icon icon="icon-park-solid:right-two" width="40" height="40" />
        </div>}
        {stateMain !== 0 && 
        <div 
        onClick={()=>setStateMain(0)}
        className=' absolute sm:bottom-2 bottom-[-60px] left-5 sm:left-[-50px] bg-white shadow sm:rounded-l-xl rounded-b-xl h-[80px] w-20 z-10 flex sm:justify-start justify-center sm:items-center items-end sm:pl-1 sm:pb-0 pb-3 duration-300 text-blue-300 cursor-pointer sm:hover:translate-x-[-20px] sm:hover:pl-3'>
            <Icon icon="icon-park-solid:left-two" width="40" height="40" />
        </div>}
        
        <div className={`bg-white sm:w-[600px] w-86 flex flex-col rounded-xl shadow-lg sm:justify-end justify-center items-center absolute z-50 duration-300 ${stateMain !== 3? 'h-[500px]':'sm:h-[700px] h-[500px]'}`}>
        {stateMain === 0 &&
            <>
                <div className='sm:text-5xl text-3xl mb-2 text-red-400 flex items-center justify-center sm:p-0 px-5 gap-3 sm:flex-row flex-col'>
                    <div>Happy Valentine's Day</div>
                    <Icon icon="solar:heart-bold" width="50" height="50" />
                </div>
                <div className='sm:w-[450px] w-4/5 relative'>
                    <img src={Img11} alt="img" className='w-full object-contain'/>
                    <img src={Img3} alt="img" className='sm:w-32 w-24 object-contain absolute sm:bottom-0 bottom-[-70px] sm:right-[-100px] right-[-40px] rotate-12'/>
                    <img src={Img1} alt="img" className='w-24 object-contain absolute sm:top-5 sm:left-[-50px] top-[-30px] left-[-50px]'/>
                    <img src={Img2} alt="img" className='w-24 object-contain absolute sm:top-5 sm:right-[-50px] top-[-30px] right-[-50px]'/>
                    <img src={Img8} alt="img" className='sm:w-36 w-24 object-contain absolute sm:bottom-[-20px] sm:left-[-120px] bottom-[-80px] left-[-50px]'/>
                    <img 
                    src={P1} alt="img" className='sm:w-[300px] w-48  object-cover absolute top-[55%] left-1/2 transform translate-[-50%] rounded-xl'/>
                </div>
            </>}
        {stateMain === 1 &&
        <>
            {smallMedia ? <div className='flex sm:flex-row flex-col  w-full h-full items-center justify-center gap-5 px-5 relative'>
                <div className='flex mt-5 gap-2 items-center'>
                    <img src={Img1} alt="img" className='sm:w-32 w-20 object-contain absolute top-[-20px] sm:right-[-35px] right-[-15px] rotate-20'/>
                    <img src={Img5} alt="img" className='sm:w-28 w-20 object-contain absolute top-5 left-0'/>
                    <img src={Img3} alt="img" className='sm:w-24 w-16 object-contain absolute sm:bottom-8 sm:left-[270px] bottom-52 right-0 rotate-20'/>
                    <img src={P2} alt="img" className='sm:w-72 w-44 sm:h-[380px] object-cover rounded-xl'/>
                    <div>
                        <div className='text-3xl text-blue-300'>PostCard</div>
                        <div className='text-lg text-gray-400'>Happy Valentine's Day</div>
                    </div>
                </div>
                
                <div className='flex flex-col gap-0 sm:gap-3 w-full'>
                    <div className='w-full'>
                        <div className='text-lg text-gray-400 flex w-full'>To: Bow</div>
                        <div className='sm:h-52 sm:my-5 my-2 text-red-400 sm:text-lg flex flex-col'>
                            &nbsp;&nbsp;&nbsp;&nbsp;สุขสันวันวาเลนไทน์นะคนเก่งของเค้า รักเธอมากๆๆๆๆๆเลยนะ อยู่กับเค้าแบบนี้ไปทุกๆปีเลยยย ยิ้มเยอะๆนะคนสวยแฟนเค้ายิ้มแล้วน่ารักที่สุดในโลกกก
                            <div className='flex items-center gap-1 w-full justify-end'>รักนะ<Icon icon="solar:heart-bold" width="16" height="16"/></div>
                        </div>
                        <div className='text-lg text-gray-400 w-full flex justify-end'>From: Deaw</div>
                    </div>
                </div>
            </div>
            :<div className='flex flex-row w-full h-full items-center justify-center gap-5 px-5 relative'>
            <div className='flex mt-5 gap-2 items-center'>
                <img src={Img1} alt="img" className='w-32 object-contain absolute top-[-20px] right-[-35px] rotate-20'/>
                <img src={Img5} alt="img" className='w-28 object-contain absolute top-5 left-0'/>
                <img src={Img3} alt="img" className='w-24 object-contain absolute bottom-8 left-[270px] right-0 rotate-20'/>
                <img src={P2} alt="img" className='w-[450px] h-[380px] object-cover rounded-xl'/>
            </div>
            <div className='flex flex-col gap-0 sm:gap-3 w-full'>
                <div className='w-full'>
                        <div className='text-4xl text-blue-300'>PostCard</div>
                        <div className='text-2xl text-gray-400'>Happy Valentine's Day</div>
                    <div className='text-xl text-gray-400 flex w-full'>To: Bow</div>
                    <div className='sm:h-52 sm:my-5 my-2 text-red-400 sm:text-xl flex flex-col'>
                        &nbsp;&nbsp;&nbsp;&nbsp;สุขสันวันวาเลนไทน์นะคนเก่งของเค้า รักเธอมากๆๆๆๆๆเลยนะ อยู่กับเค้าแบบนี้ไปทุกๆปีเลยยย ยิ้มเยอะๆนะคนสวยแฟนเค้ายิ้มแล้วน่ารักที่สุดในโลกกก
                        <div className='flex items-center gap-1 w-full justify-end'>รักนะ<Icon icon="solar:heart-bold" width="16" height="16"/></div>
                    </div>
                    <div className='text-xl text-gray-400 w-full flex justify-end'>From: Deaw</div>
                </div>
            </div>
        </div>}
        </>}
        {stateMain === 2 &&
        <>
            <div className='flex flex-col w-full h-full items-center px-5 relative'>
                <img src={Img7} alt="img" className='w-32 object-contain absolute top-[-20px] right-[-35px] rotate-20'/>
                <img src={Img3} alt="img" className='w-20 object-contain absolute top-36 left-[-10px] rotate-[-20deg]'/>
                <div className='flex gap-3 w-full items-center sm:pl-5 sm:mt-0 mt-5'>
                    <div className='sm:w-60 w-44 p-2 bg-white rounded-2xl border-4 border-pink-300 mt-5 border-dashed '>
                        <img src={P3} alt="img" className='w-full object-cover rounded-xl'/>
                    </div>
                    <div className='flex flex-col gap-3 sm:w-full w-1/2 items-center'>
                        <div className='sm:text-3xl text-xl text-blue-300 sm:mt-10 break-words text-center'>How long have you been together?</div>
                            <div className=' text-pink-300 sm:mt-5 flex gap-3 sm:items-end sm:flex-row flex-col'>
                                <div className='flex flex-row items-end gap-2'>
                                    {/* <div className='sm:text-5xl text-4xl'>{countYear}</div>
                                    <div className='text-xl'>Years</div> */}
                                </div>
                                <div className='flex flex-row items-end gap-2'>
                                    <div className='sm:text-5xl text-4xl'>{countMonth}</div>
                                    <div className='text-xl'>Months</div>
                                </div>
                                <div className='flex flex-row items-end gap-2'>
                                    <div className='sm:text-5xl text-4xl'>{countDay}</div>
                                    <div className='text-xl'>Days</div>
                                </div>
                            </div>
                    </div>
                </div>
                <div className='flex flex-col gap-3 w-full items-center justify-center'>
                    <div className='text-3xl flex text-gray-400 sm:mt-8 mt-5 duration-300 px-10 shrink-0 w-full justify-between'>
                        <div className='flex flex-col items-center gap-3'>
                            <div className=' flex justify-center text-3xl'>{timeDiff.totalDays}</div>
                            <div className=' flex justify-center text-lg'>Days</div>
                        </div>
                        :<div className='flex flex-col items-center gap-3'>
                            <div className=' flex justify-center text-3xl'>{timeDiff.remainingHours}</div>
                            <div className=' flex justify-center text-lg'>Hours</div>
                        </div>
                        :<div className='flex flex-col items-center gap-3'>
                            <div className=' flex justify-center text-3xl'>{timeDiff.remainingMinutes}</div>
                            <div className=' flex justify-center text-lg'>Minutes</div>
                        </div>
                        :<div className='flex flex-col items-center gap-3'>
                            <div className=' flex justify-center text-3xl'>{timeDiff.remainingSeconds}</div>
                            <div className=' flex justify-center text-lg'>Seconds</div>
                        </div>
                    </div>
                </div>
                <div className='flex w-full justify-center gap-28'>
                    <img src={Img5} alt="img" className='w-32 object-contain'/>
                    <img src={Img8} alt="img" className='w-24 object-contain'/>

                </div>
                
            </div>
        </>}
        {stateMain === 3 &&
        <>  
            <img src={Img2} alt="img" className='w-16 object-contain absolute top-[-40px] right-[20px] z-50'/>
            <img src={Img5} alt="img" className='w-30 object-contain absolute bottom-[-20px] left-[-30px] z-50'/>
            <div className="flex w-full h-full items-start gap-5 px-5 relative overflow-y-auto overflow-x-hidden py-5">
                
                <div className="flex flex-wrap justify-between w-full max-w-[1320px] mx-auto ">
                    {/* คอลัมน์ที่ 1 */}
                    <div className="flex flex-col w-[32%] gap-3">
                    {urlCol1.map((src, index) => (
                        <img 
                        onClick={()=>{setSelectImg(index*3); setSelectImgOn(true)}}
                        key={index} src={src} alt={`Image ${index}`} loading='lazy' className={`w-full h-auto rounded-lg shadow-lg`}/>
                    ))}
                    </div>

                    <div className="flex flex-col w-[32%] gap-3">
                        {urlCol2.map((src, index) => (
                            <img  
                            onClick={()=>{setSelectImg(index*3+1); setSelectImgOn(true)}}
                            key={index} src={src} alt={`Image ${index}`} loading='lazy' className={`w-full h-auto rounded-lg shadow-lg`}/>
                        ))}
                    </div>

                    <div className="flex flex-col w-[32%] gap-3">
                        {urlCol3.map((src, index) => (
                            <img  
                            onClick={()=>{setSelectImg(index*3+2); setSelectImgOn(true)}}
                            key={index} src={src} alt={`Image ${index}`} loading='lazy' className={`w-full h-auto rounded-lg shadow-lg `}/>
                        ))}
                    </div>
                </div>
            </div>
        </>}
        </div>

    </div>
    <div 
    onClick={(e) => {
        e.stopPropagation(); // Prevent click from triggering handlePopup
        handlePopup();
    }}
    className={`fixed h-screen w-screen backdrop-blur-xs flex justify-center items-center duration-300 gap-1 ${selectImgOn ? 'opacity-100 ' : 'opacity-0'} ${selectImg !== null ? 'z-50' : ''}`}
    >
        <div 
            onClick={selectImg !== null ? (e) => {
                e.stopPropagation(); // Stop click propagation
                selectImg - 1 < 0 ? setSelectImg(numPhotos) : setSelectImg(selectImg - 1);
            } : undefined}
        >
            <Icon icon="mingcute:left-fill" width="28" height="28" className='text-white cursor-pointer h-14 hover:scale-105 hover:bg-gradient-to-l hover:from-blue-300 hover:to-transparent'/>
        </div>
        
        <div className='w-86 h-auto'>
            {selectImg !== null && (
                <img src={uploaded_images[selectImg].url} className={`w-full h-auto rounded-lg shadow-lg duration-300 ${selectImgOn ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
            )}
        </div>
        
        <div 
            onClick={selectImg !== null ? (e) => {
                e.stopPropagation(); // Stop click propagation
                selectImg + 1 > numPhotos ? setSelectImg(1) : setSelectImg(selectImg + 1);
            } : undefined}
        >
            <Icon icon="mingcute:right-fill" width="28" height="28" className='text-white cursor-pointer h-14 hover:scale-105 hover:bg-gradient-to-r hover:from-blue-300 hover:to-transparent'/>
        </div>
    </div>
    </>
  )
}

export default Main