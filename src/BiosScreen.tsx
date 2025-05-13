import logo from './assets/mainlogo.png'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function BiosScreen() {

    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    const navigate = useNavigate();


    //only one run will go so the bug is not a problem
    useEffect(() => {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if(prev>= 100)
          {
            clearInterval(progressInterval);
            setProgress(100);
            setTimeout(() => {
              navigate("/main-screen");
            }, 1000);
          }
          return prev + 0.2;
        })
      },10);
      return () => clearInterval(progressInterval);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => { 
            setIsVisible(true);
        },1000);

        return () => clearTimeout(timer);
    }, [])


  return (
    <div className={`bg-black w-screen h-screen flex flex-col items-center justify-center transition-opacity duration-1000
    ${isVisible ? 'opacity-100' : 'opacity-0'} border-2 border-white`}>
        <img src={logo}></img>
        <div className='w-164 h-10 rounded-xl border-2 border-white overflow-hidden'>
          <div className='h-full bg-green-500' 
          style={{ width: `${progress}%`}}></div>
        </div>
    </div> 
  )
}

export default BiosScreen
