import React,{ useState, } from 'react'
import { Icon } from "@iconify/react";
import Img4 from '../../public/assets/images/4.png'
import Img6 from '../../public/assets/images/6.png'
import Img8 from '../../public/assets/images/8.png'
import emailjs from "emailjs-com";
import { Hearts } from 'react-loader-spinner'

interface IntroPageProps {
    password: {
        day: string,
        month: string,
        year: string,
    },
    setPassword: (value:{day:string, month:string, year:string}) => void
    setStatePage: (value:number) => void
    setStateBanner: (value:boolean) => void
    setDataBanner: (value:string) => void
}

const IntroPage: React.FC<IntroPageProps>=({password, setPassword, setStatePage, setStateBanner, setDataBanner}) =>{

    const [stateHint, setStateHint] = useState(false)
    const [stateLock, setStateLock] = useState(true)
    const [onLoad, setOnLoad] = useState(false)
    const [stateQuestion, setStateQuestion] = useState(0)
    const Question = ['รักเรามั้ยย', 'เอาอีก', 'เอาอีกกกกกกกก', 'รักเราแค่ไหนเอ่ย', 'แค่ไหนนะ', 'จริงอะป่าวววว']
    const Choice1 = ['รัก', 'ร้ากกกกกกกก', 'ร้ากกกกกกกกกกกกกก', 'ที่สุดดดดดดดดดด', 'ที่สุดดดดดดด', 'แน่นอนนนน']
    const Choice2 = ['ร้ากกกกก', 'ร้ากกกกกกกกกกกก', 'ร้ากกกกกกกกกกกกกกกกกกกกกกกกกกกก', 'ที่สุดในโลกกกกกกก', 'ที่สุดดดดดดดดดดดด', 'จริงที่สุดดดดดในโลกเลยยยยย']
    const [answer, setAnswer] = useState([{
        question: 'รักเค้ามั้ยย',
        choice1: 'รัก',
        choice2: 'ร้ากกกกก',
        answer: ''
    },{
        question: 'เอาอีก',
        choice1: 'ร้ากกกกกกกก',
        choice2: 'ร้ากกกกกกกกกกกก',
        answer: ''
    },{
        question: 'เอาอีกกกกกกกก',
        choice1: 'ร้ากกกกกกกกกกกกกก', 
        choice2: 'ร้ากกกกกกกกกกกกกกกกกกกกกกกกกกกก',
        answer: ''
    },{
        question: 'รักเค้าแค่ไหนนนน',
        choice1: 'ที่สุดดดดดดดดดด',
        choice2: 'ที่สุดในโลกกกกกกก',
        answer: ''
    },{
        question: 'แค่ไหนนะ',
        choice1: 'ที่สุดดดดดดด',
        choice2: 'ที่สุดดดดดดดดดดดด',
        answer: ''
    },{
        question: 'จริงอะป่าวววว',
        choice1: 'แน่นอนนนน',
        choice2: 'จริงที่สุดดดดดในโลกเลยยยยย',
        answer: ''
    },{
        question: 'ข้อสุดท้ายละ มีอะไรอยากจะฝากบอกเค้าไหม?',
        choice1: '',
        choice2: '',
        answer: ''
    }
])
console.log(answer)



const handleSetanswer = ({ index, Choice }: { index: number; Choice: number }) => {
    const newAnswer = [...answer]
    if(Choice === 1){
        newAnswer[index].answer = answer[index].choice1
    }else if(Choice === 2){
        newAnswer[index].answer = answer[index].choice2
    } else {
        newAnswer[index].answer = 'ไม่รัก'
    }
    setAnswer(newAnswer)
    setStateQuestion(stateQuestion+1)
  };


  const handleSentEmail = () => {
    setOnLoad(true);
    const templateParams = {
      to_email: "deawandnathai@gmail.com",
      message: JSON.stringify(answer, null, 2),
    };
  
    emailjs
      .send("service_6yftccc", "template_x6l69ic", templateParams, "cH5jRN-6CAwY379km")
      .then((response) => {
        console.log("Email sent!", response);
        setOnLoad(false);
        setStatePage(1)
        setStateBanner(true)
        setTimeout(() => {
            setDataBanner('sendMailSuccess')
        }, 50);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  const handlaSentPassword = () => {
    if(parseInt(password.day) === 5 && parseInt(password.month) === 9 && parseInt(password.year) === 2024 ){
      setStateLock(false)
      setStateBanner(true)
      setTimeout(() => {
        setDataBanner('unlock')
      }, 50);
      
    }
  }



//   const [countDown, setCountDown] = useState('');
//   const [canOpen, setCanOpen] = useState(false);
  
//   useEffect(() => {
//     const valentine = Date.UTC(2025, 1, 14, 0, 0, 0);
  
//     const updateCountdown = () => {
//         const now = Date.UTC(
//             new Date().getFullYear(), 
//             new Date().getMonth(), 
//             new Date().getDate(), 
//             new Date().getHours(), 
//             new Date().getMinutes(), 
//             new Date().getSeconds()
//           );
//       const distance = valentine - now;
  
//       if (distance < 0) {
//         setCanOpen(true);
//         setCountDown("เปิดได้แล้ว!");
//         return;
//       }
  
//       const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  
//       let countdownString = 'ยังไม่ถึงเวลานะ : ';
//       if (days > 0) countdownString += `${days} วัน `;
//       if (hours > 0 || days > 0) countdownString += `${hours} ชั่วโมง `;
//       if (minutes > 0 || hours > 0 || days > 0) countdownString += `${minutes} นาที `;
//       countdownString += `${seconds} วินาที`;
  
//       setCountDown(countdownString);
//     };
  
//     updateCountdown(); // Initial call
//     const interval = setInterval(updateCountdown, 1000); // Update every second
  
//     return () => clearInterval(interval); // Cleanup interval on unmount
//   }, []);



    return (
        <div className='w-full h-full flex items-center justify-center backdrop-blur-sm shadow-lg'>
            <div className={` bg-white rounded-3xl shadow-lg flex flex-col items-center p-5 relative duration-500 ${stateLock ? 'w-96 h-96': ''}`}>
                {stateLock ? 
                <>
                    <div className='w-full flex justify-end items-center'>
                        <div className='h-10 flex justify-center items-center rounded-full shadow-sm'>
                            <div className={`h-10 overflow-hidden duration-300 flex justify-end items-center text-blue-300 ${stateHint?'w-56':'w-0 opacity-0'}`}>
                                <div className=' shrink-0 flex gap-2'><Icon icon="solar:heart-bold" width="24" height="24" /> Hint : เราคบกันวันที่เท่าไหร่ค้าบ </div>
                            </div> 
                            <div 
                            onMouseEnter={() => setStateHint(true)}
                            onMouseLeave={() => setStateHint(false)}
                            className="text-pink-300 h-10 w-10 rounded-full flex justify-center items-center bg-white cursor-pointer hover:scale-105 duration-200 ">
                                <Icon icon="akar-icons:light-bulb" width="24" height="24" />
                            </div>
                        </div>
                        
                    </div>
                    <div className='flex flex-col items-center h-full gap-5' >
                        <div className='flex items-center h-32'>
                            <img src={Img8} alt="img" className='w-24 object-contain'/>
                            <div className='text-lg flex justify-center items-center '>ใส่หรัสผ่าน?</div>
                        </div>
                        <div className='text-xl w-full flex justify-center items-center gap-3'>
                            <input 
                            maxLength={2}
                            type='text' 
                            placeholder='__'
                            value={password.day}
                            onChange={(e) => setPassword({...password, day:e.target.value})}
                            className='w-1/5 h-12 rounded-lg border border-pink-200 text-center outline-none'/>
                            <input 
                            maxLength={2}
                            type='text' 
                            placeholder='__'
                            value={password.month}
                            onChange={(e) => setPassword({...password, month:e.target.value})}
                            className='w-1/5 h-12 rounded-lg border border-pink-200 text-center outline-none'/>
                            <input 
                            maxLength={4}
                            type='text' 
                            placeholder='____'
                            value={password.year}
                            onChange={(e) => setPassword({...password, year:e.target.value})}
                            className='w-1/5 h-12 rounded-lg border border-pink-200 text-center outline-none'/>
                        </div>
                        <div 
                        onClick={handlaSentPassword}
                        className={`text-xl text-white w-10/12 h-12 overflow-hidden rounded-full flex justify-center items-center cursor-pointer sm:hover:scale-105 duration-200 gap-2 active:scale-95 sm:hover:from-pink-300 sm:hover:to-blue-300 sm:active:from-pink-300 sm:active:to-blue-300 bg-gradient-to-tr from-pink-300 to-pink-300`}>
                            <Icon icon="ph:lock-key-fill" width="25" height="25" />
                            <div>ปลดล็อค</div>
                        </div>
                        {/* <div className='text-blue-300'>{countDown}</div> */}
                    </div>
                </>
                :<>
                {stateQuestion < 6 ?
                    <div className='flex flex-col items-center gap-5 relative'>
                        {stateQuestion === 0 && 
                        <div 
                        onClick={() => setStatePage(1)}
                        className=' absolute right-[-8px] top-[-8px] text-blue-300 cursor-pointer hover:scale-110 duration-200'>
                            <Icon icon="icomoon-free:cross" width="20" height="20" />
                        </div>}
                        <div className='flex items-center gap-2'>{Question[stateQuestion]}<Icon icon="fluent-emoji-flat:pleading-face" width="32" height="32" /></div>
                        <div className='flex gap-5'>
                            <div 
                            onClick={() => handleSetanswer({ index: stateQuestion, Choice: 1 })}
                            className=' break-words p-2 w-32 min-h-10 flex justify-center items-center bg-pink-300 rounded-xl shadow cursor-pointer hover:scale-105 duration-200'>{Choice1[stateQuestion]}</div>
                            <div 
                            onClick={() => handleSetanswer({ index: stateQuestion, Choice: 2 })}
                            className=' break-words p-2 w-32 min-h-10 flex justify-center items-center bg-pink-300 rounded-xl shadow cursor-pointer hover:scale-105 duration-200'>{Choice2[stateQuestion]}</div>
                        </div>
                    </div>
                :stateQuestion === 6 ? <>
                <div className='flex flex-col items-center gap-5 relative '>
                    <img src={Img6} alt="img" className='w-24 object-contain absolute left-[-50px] top-[-40px] rotate-[-30deg] ms:rotate-0'/>
                    {stateQuestion === 6 && 
                        <div 
                        onClick={() => setStatePage(1)}
                        className=' absolute right-[-8px] top-[-8px] text-blue-300 cursor-pointer hover:scale-110 duration-200'>
                            <Icon icon="icomoon-free:cross" width="20" height="20" />
                        </div>}
                    <div className='flex items-center gap-2'>ข้อสุดท้ายละ มีอะไรอยากจะฝากบอกเค้าไหม?</div>
                    <div>
                        <textarea
                        placeholder='ความในใจ'
                        value={answer[6]?.answer || ""} // ป้องกัน error ถ้า answer[6] ไม่มีค่า
                        onChange={(e) =>
                            setAnswer((prev) =>
                                prev.map((item, index) =>
                                    index === 6 ? { ...item, answer: e.target.value } : item
                                )
                            )
                        }
                        className='sm:w-96 w-80 h-32 rounded-xl border border-pink-300 outline-none p-2 resize-none'/>
                    </div>
                    <div className='flex gap-5 w-full justify-end'>
                        <div 
                        onClick={() => setStateQuestion(stateQuestion+1)}
                        className='text-white break-words p-2 w-24 min-h-10 flex justify-center items-center bg-pink-300 rounded-xl shadow cursor-pointer hover:scale-105 duration-200'>
                            <Icon icon="maki:arrow" width="20" height="20" />
                        </div>
                    </div>
                </div>
                </>
                :stateQuestion === 7 && <>
                <div className='flex flex-col items-center gap-5 relative'>
                    <div className='flex flex-col items-center gap-2'>
                        คำตอบและความรักของเธอทั้งหมด
                        <div className='flex gap-2 items-center'>
                            จะถูกส่งมาให้เค้าผ่าน email นะ <Icon icon="twemoji:winking-face" width="20" height="20" />
                        </div>
                    </div>
                    <img src={Img4} alt="img" className='w-24 object-contain'/>
                    <div className='flex gap-5 w-full justify-center'>
                        <div 
                        onClick={() => onLoad ? null : handleSentEmail()}
                        className='text-white break-words p-2 w-40 h-10 flex justify-center items-center bg-pink-300 rounded-xl shadow cursor-pointer hover:scale-105 duration-200'>
                            {onLoad?<><Hearts
                                        height="30"
                                        width="50"
                                        color="#fff"
                                        ariaLabel="three-dots-loading"
                                        />
                                        </>:<><Icon icon="mingcute:send-fill" width="24" height="24" />ส่งเลย</>}
                        </div>
                    </div>
                </div>
                </>
                }
                </>}
            </div>
        </div>
    )
}

export default IntroPage 