import logo from './assets/mainlogo.png'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function BiosScreen() {

    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
      let timeout: NodeJS.Timeout;
        const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if(prev>= 100)
          {
                timeout = setTimeout(() => {
                navigate('/main-screen');
            }, 1000)
            return 100;
          }
          return prev + 0.2;
        })
      },10);

      return () => {
        clearInterval(progressInterval);
        clearTimeout(timeout);
      };
    }, [navigate]);

    useEffect(() => {
        const timer = setTimeout(() => { 
            setIsVisible(true);
        },1000);

        return () => clearTimeout(timer);
    }, [])


  return (
    <div
      className={`bg-black w-screen h-screen flex flex-col items-center justify-center transition-opacity duration-1000
    ${isVisible ? "opacity-100" : "opacity-0"} border-2 border-white`}
    >
      <img src={logo}></img>
      <div className="w-164 h-10 rounded-xl border-2 border-white overflow-hidden">
        <div
          className="h-full bg-green-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="absolute bottom-0 right-0 mr-5 mb-4 text-white font-medium">
        <p className="">Press F2 to open Setup</p>
        <p className="">Press F12 to change Boot Drive</p>
      </div>
    </div>
  );
}

export default BiosScreen
