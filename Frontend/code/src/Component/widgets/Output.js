import React, { useState, useEffect, useCallback } from 'react';
import { RingLoader } from 'react-spinners';
import { FaTimes } from 'react-icons/fa';
import Testcase from './Testcase';
import Chip from './Chip';

const Output = ({ resp, iserr, isLoading, isRun, setRun, testcase, testCasepassed, totalTestCases }) => {
  const sampleTestCases = testcase.filter(tc => tc.status === "sample");
  const [selectedChip, setSelectedChip] = useState(sampleTestCases[0]?.tid);
  const [currentTestCase, setCurrentTestCase] = useState(sampleTestCases[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAISuggestions, setShowAISuggestions] = useState(false); // Toggle for AI Suggestions
  const [containerHeight, setContainerHeight] = useState(500); // Initial height of the container

  const handleChipClick = useCallback((testcase_no, index) => {
    setSelectedChip(testcase_no);
    setCurrentTestCase(sampleTestCases[index]);
    setCurrentIndex(index);
  }, [sampleTestCases]);

  useEffect(() => {
    if (sampleTestCases.length > 0) {
      handleChipClick(sampleTestCases[currentIndex].tid, currentIndex);
    }
  }, [currentIndex, sampleTestCases, handleChipClick]);

  return (
    <>
      <style>
        {`
          /* Hide the scrollbar but keep the content scrollable */
          .custom-scrollbar-hidden::-webkit-scrollbar {
            display: none; /* Hide scrollbar in WebKit-based browsers (Chrome, Safari) */
          }

          .custom-scrollbar-hidden {
            -ms-overflow-style: none; /* Hide scrollbar in Internet Explorer */
            scrollbar-width: none; /* Hide scrollbar in Firefox */
          }

          /* Scrollable container for the content */
          .scrollable-content {
            max-height: calc(100% - 120px); /* Adjust the height to fit above content */
            overflow-y: scroll; /* Enable scrolling */
            padding-right: 16px; /* To ensure content doesn't touch the right edge */
          }
        `}
      </style>

      <div
        className={`h-[${containerHeight}px] bg-slate-800 w-full absolute z-50 md:bottom-0 -bottom-8 p-10 rounded-t-2xl shadow-sm transition-transform duration-300 ${isRun ? 'translate-x-0' : 'translate-x-full'} custom-scrollbar-hidden`}
      >
        {/* Header Section */}
        <div className="flex flex-row justify-between my-2">
          <p className="text-white font-bold text-2xl">Output</p>
          <FaTimes
            className="hover:text-orange-400 text-white cursor-pointer"
            size={30}
            onClick={() => setRun(false)}
          />
        </div>

        {/* Test Case Status */}
        <div className="text-lg text-slate-400">
          {"Testcases passed: " + testCasepassed + "/" + totalTestCases}
        </div>

        {/* Result Message (Static) */}
        {!isLoading && (
          <div className="mt-2">
            {testCasepassed === totalTestCases ? (
              <h1 className="text-green-500 font-semibold text-xl">Congratulations!</h1>
            ) : (
              <h1 className="text-red-500 text-xl font-semibold">Wrong Answer</h1>
            )}
          </div>
        )}

        {/* Expandable AI Suggestions (Static) */}
        {!isLoading && testCasepassed !== totalTestCases && (
          <div className="mt-4">
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none"
              onClick={() => setShowAISuggestions(!showAISuggestions)}
            >
              {showAISuggestions ? "Hide AI Suggestions" : "Show AI Suggestions"}
            </button>
            {showAISuggestions && (
              <div className="mt-2 p-4 bg-slate-700 rounded-md text-white">
                <h2 className="text-lg font-bold text-orange-400">AI Suggestions:</h2>
                <p className="text-sm mt-2">This is a placeholder for AI-generated feedback and analysis.</p>
              </div>
            )}
          </div>
        )}

        {/* Loader if still loading */}
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <RingLoader color="#ffffff" />
          </div>
        ) : (
          <div className="scrollable-content py-5 text-xl custom-scrollbar-hidden">
            <div className="scroll-hidden flex gap-2 text-white">
              {sampleTestCases.map((t, index) => (
                <Chip
                  ispass={t.iscorrect}
                  key={t.tid}
                  testcase_no={index + 1}
                  isSelected={selectedChip === t.tid}
                  onClick={() => handleChipClick(t.tid, index)}
                />
              ))}
            </div>
            {currentTestCase && <Testcase tcase={currentTestCase} />}
          </div>
        )}
      </div>
    </>
  );
};

export default Output;
