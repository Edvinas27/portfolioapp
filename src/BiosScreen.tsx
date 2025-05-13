import logo from './assets/mainlogo.png'
import { useEffect, useState } from 'react'

function BiosScreen() {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => { 
            setIsVisible(true);
        },1000);

        return () => clearTimeout(timer);
    }, [])


  return (
    <div className={`bg-black w-screen h-screen flex flex-col items-center justify-center transition-opacity duration-1000
    ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <img src={logo}></img>
        <div className='w-150 h-10 rounded-xl border-2 border-white'>

        </div>
    </div> 
  )
}

export default BiosScreen
