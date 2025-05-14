import React, { useState } from 'react'
import { useEffect } from 'react';

const MainScreen = () => {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 500);

        return () => clearTimeout(timer);
    })

  return (
    <div className={`"w-screen h-screen flex border-2 border-white transition-opacity duration-500
    ${isVisible ? 'opacity-100' : 'opacity-0'} flex items-center justify-center`}>
        <p className='text-white'>OS LOGIN SCREEN</p>
    </div>
  )
}

export default MainScreen
