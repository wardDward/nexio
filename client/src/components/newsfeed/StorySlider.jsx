import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const StoryCard = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white border border-gray-500 min-w-[100px] h-[150px] rounded-lg cursor-pointer hover:bg-slate-100 mx-1 overflow-hidden">
      <div className="relative h-full flex">
        <img
          src="https://images.unsplash.com/photo-1642649149963-0ef6779df6c6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="h-full w-full object-cover"
          alt=""
        />
        <p className="text-xs mt-2 absolute z-[999] max-w-full truncate px-1 top-[80%] text-black font-bold">
          Edward Taligatos
        </p>
      </div>
    </div>
  );
};

export default function StorySlider() {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [lastCardWidth, setLastCardWidth] = useState(0);
  const [showPrevButton, setShowPrevButton] = useState(false);
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    if (cardsContainerRef.current) {
      const lastCard = cardsContainerRef.current.lastChild;
      if (lastCard) {
        setLastCardWidth(lastCard.offsetWidth);
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (cardsContainerRef.current) {
        setShowPrevButton(cardsContainerRef.current.scrollLeft > 0);
      }
    };

    const container = cardsContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - cardsContainerRef.current.offsetLeft);
    setScrollLeft(cardsContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - cardsContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1; // Adjust the sensitivity of dragging
    cardsContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handlePrevClick = () => {
    const cardWidth = 100 + 2 * 1; // Width of a card + margin
    cardsContainerRef.current.scrollLeft -= cardWidth;
    setScrollLeft(cardsContainerRef.current.scrollLeft);
  };

  const handleNextClick = () => {
    const cardWidth = 100 + 2 * 1; // Width of a card + margin
    cardsContainerRef.current.scrollLeft += cardWidth;
    setScrollLeft(cardsContainerRef.current.scrollLeft);
  };

  return (
    <>
      <div
        className="flex items-center w-full lg:w-[60%] overflow-x-scroll story-container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        ref={cardsContainerRef}
      >
        {showPrevButton && (
          <button
            onClick={handlePrevClick}
            className="absolute left-[1%] lg:left-[22%] z-[9999] p-2 bg-white rounded-full hover:bg-slate-200"
          >
            <ArrowBackIcon />
          </button>
        )}
        <div className="flex items-center ">
          <Link
            to=""
            className="flex flex-col items-center justify-center  border min-w-[100px] h-[130px] rounded-lg cursor-pointer hover:bg-slate-100 mx-1"
          >
            <AddBoxOutlinedIcon />
            <span className="text-sm mt-2 text-center">Create Story</span>
          </Link>
          <StoryCard />
          <StoryCard />
          <StoryCard />
          <StoryCard />
          <StoryCard />
          <StoryCard />
          <StoryCard />
          <StoryCard />
          <StoryCard />
          <StoryCard />
          <StoryCard />
        </div>
        <button
          onClick={handleNextClick}
          className="absolute right-[0%] md:right-[30%] lg:right-[18%] z-[9999] p-2 bg-white rounded-full hover:bg-slate-200"
        >
          <ArrowForwardIcon />
        </button>
      </div>
    </>
  );
}

// NOTE: Slider is created by gpt (the function of slider only)
