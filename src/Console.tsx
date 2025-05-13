import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function getDate() {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "short",
    month: "short",
    hour12: false,
  };
  const formattedDate = date
    .toLocaleString("en-US", options)
    .replace("AM", "")
    .replace("PM", "")
    .replace(",", "");

  return formattedDate;
}

function useTypeWriter({
  text,
  delay,
  onComplete,
}: {
  text: string;
  delay: number;
  onComplete?: () => void;
}) {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else {
      onComplete?.();
    }
  }, [currentIndex, text, delay, onComplete]);

  useEffect(() => {
    if (currentIndex < text.length) return;

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, [currentIndex, text.length]);

  return `${currentText}${showCursor ? "|" : ""}`;
}

function Console() {
  const [staticDate] = useState(getDate());
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false); // State to control fade-out
  const navigate = useNavigate();

  const typewriterText = useTypeWriter({
    text: "sudo rm -rf / --no-preserve-root",
    delay: 100,
    onComplete: () => {
      setTimeout(() => {
        setTimeout(() => {
          setIsFullScreen(true);
        }, 500);

        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            navigate("/error-screen");
          }, 700);
        }, 500);
      }, 2000);
    },
  });

  return (
    <div
      className={`h-screen w-screen flex justify-center items-center bg-[#1E1E1E] transition-opacity duration-500 ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`${
          isFullScreen
            ? "h-screen w-screen"
            : "border-2 border-[#75777A] h-3/5 w-3/5 bg-[#1E1E1E] rounded-xl text-base"
        } transition-all duration-700`}
      >
        <div className="h-11 bg-[#383837] rounded-t-xl">
          <div className="flex justify-between text-[#B5B4B3]">
            <div className="flex justify-start items-center mt-1 ml-2">
              <div className="h-4 w-4 bg-[#FF605C] rounded-full m-2"></div>
              <div className="h-4 w-4 bg-[#FFBD44] rounded-full m-2"></div>
              <div className="h-4 w-4 bg-[#00CA4E] rounded-full m-2"></div>
            </div>
            <div className="mt-2">
              <p>
                Edvinas-Montvilas —— -zsh ——{" "}
                {Math.floor((innerWidth * (3 / 5)) / 14)}x
                {Math.floor((innerHeight * (3 / 5)) / 14)}
              </p>
            </div>
            <div className="mt-2 mr-4">
              <p>Software Engineer</p>
            </div>
          </div>
        </div>
        <p className="text-white text-sm ml-2 mt-2">
          Last login: {staticDate} on ttys004
        </p>
        <p className="text-white text-sm ml-2">
          Edvinas-Montvilas@Portfolio-MacBook-Air ~ % {typewriterText}
        </p>
      </div>
    </div>
  );
}

export default Console;
