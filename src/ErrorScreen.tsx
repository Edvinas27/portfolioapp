import { useEffect, useRef, useState } from "react";
import {text} from "./textdata.tsx";
import { useNavigate } from "react-router-dom";

  function useTypeWriter({ text, delay }: { text: string; delay: number }) {
    const [currentText, setCurrentText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const chunkSize = 3;

    useEffect(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setCurrentText((prev) => prev + text.slice(currentIndex, currentIndex + chunkSize));  
          setCurrentIndex((prev) => prev + chunkSize);
        }, delay);

        return () => clearTimeout(timeout);
      }
    }, [currentIndex, text, delay]);

    return currentText;
  }

function ErrorScreen() {
  const typeWriterText = useTypeWriter({ text, delay: 0.5 });
  const lines = typeWriterText.split("\n");
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/bios-screen")
    }, 2500)
    if(containerRef.current)
    {
      requestAnimationFrame(() => {
        containerRef.current?.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: "instant",
        })
      })
    }
    return () => {
      clearTimeout(timeout);
    }
  }, [navigate, typeWriterText])



  return (
      <div
        ref={containerRef}
        className="h-screen w-screen items-center bg-black overflow-y-auto p-4 transition- duration-500"
      >
        {lines.map((line, index) => (
          <p key={index} className="text-red-500 text-2xl">
            {line}
          </p>
        ))}
      </div>
  );
}

export default ErrorScreen;