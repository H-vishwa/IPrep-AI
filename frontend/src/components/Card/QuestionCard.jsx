import React, { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AIRespnsivePreviw from "../../pages/InterviewPrep/components/AIRespnsivePreviw";

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  ontogglePin,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight + 10);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-lg mb-4 overflow-hidden py-4 shadow-2xl shadow-gray-100/70 border border-gray-100/60 group">
      <div className="flex justify-between items-start px-4">
        {/* Left side: Q label and question text */}
        <div className="flex gap-3.5 flex-1">
          <span className="text-xs md:text-[15px] font-semibold text-gray-400 leading-[18px]">
            Q
          </span>
          <h3
            className="text-xs md:text-[14px] font-medium text-gray-800"
            onClick={toggleExpand}
          >
            {question}
          </h3>
        </div>

        {/* Right side: Buttons */}
        <div className="flex items-center gap-2 ml-4 shrink-0">
          <button
            className="flex items-center gap-2 text-xs text-indigo-800 font-medium bg-indigo-50 px-3 py-1 rounded border border-indigo-50 hover:bg-indigo-200"
            onClick={ontogglePin}
          >
            {isPinned ? <LuPinOff size={14} /> : <LuPin size={14} />}
          </button>

          <button
            className="flex items-center gap-2 text-xs text-cyan-800 font-medium bg-cyan-50 px-3 py-1 rounded border border-cyan-50 hover:bg-cyan-200"
            onClick={() => {
              setIsExpanded(true);
              onLearnMore();
            }}
          >
            <LuSparkles size={14} />
            <span className="hidden md:block">Learn More</span>
          </button>

          <button
            className="text-gray-400 hover:text-gray-500"
            onClick={toggleExpand}
          >
            <LuChevronDown
              size={20}
              className={`transform transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Collapsible Answer Section */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out px-4"
        style={{ maxHeight: `${height}px` }}
      >
        <div
          className="mt-4 text-gray-700 bg-gray-50 px-5 py-3 rounded-lg"
          ref={contentRef}
        >
            <AIRespnsivePreviw content={answer} />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
