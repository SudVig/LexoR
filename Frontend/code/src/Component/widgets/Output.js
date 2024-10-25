import React, { useState, useEffect, useCallback} from 'react';
import { RingLoader } from 'react-spinners';
import { FaTimes } from 'react-icons/fa';
import Testcase from './Testcase';
import Chip from './Chip';
import './custom.css';



  const Output = ({ resp, iserr, isLoading, isRun, setRun, testcase, testCasepassed,totalTestCases }) => {
  const sampleTestCases = testcase.filter(tc => tc.status === "sample");
  const [selectedChip, setSelectedChip] = useState(sampleTestCases[0]?.tid);
  const [currentTestCase, setCurrentTestCase] = useState(sampleTestCases[0]);
  const [currentIndex,setCurrentIndex]=useState(0);

  const handleChipClick = useCallback((testcase_no, index) => {
    setSelectedChip(testcase_no);
    setCurrentTestCase(sampleTestCases[index]);
    setCurrentIndex(index);
  }, [sampleTestCases]); // Make sure to include sampleTestCases as a dependency

  useEffect(() => {
    if (sampleTestCases.length > 0) {
 
      handleChipClick(sampleTestCases[currentIndex].tid, currentIndex); 
    }
  }, [currentIndex,sampleTestCases, handleChipClick]);

  return (
    <div className={`h-[500px] bg-slate-800 w-full absolute z-50 md:bottom-0 -bottom-8 p-10 rounded-t-2xl shadow-sm transition-transform duration-300 ${isRun ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className='flex flex-row justify-between'>
        <p className='text-white font-bold text-2xl'>Output</p>
        <FaTimes 
          className='hover:text-orange-400 text-white cursor-pointer' 
          size={30} 
          onClick={() => setRun(false)}
        />
      </div>
      <div className='text-lg text-slate-400'>{"Testcases passed: " + testCasepassed + "/" + totalTestCases}</div>
      <div>
        {
          !isLoading ?(testCasepassed===totalTestCases?(<h1 className='text-green-500 font-semibold text-xl mt-2'>Congratulations !</h1>):(<h1 className='text-red-500 text-xl mt-2 font-semibold'>Wrong Answer</h1>)):""
        }

      </div>
      {isLoading ? (
        <div className='flex items-center justify-center h-full'>
          <RingLoader color="#ffffff" />
        </div>
      ) : (
        <div className='py-5 text-xl'>
          <div className='scroll-hidden flex gap-2 text-white'>
            {sampleTestCases.map((t, index) => (
              <Chip 
                ispass={t.iscorrect}
                key={t.tid} 
                testcase_no={index+1} 
                isSelected={selectedChip === t.tid} 
                onClick={() => handleChipClick(t.tid, index)} 
              />
            ))}
          </div>
          {currentTestCase && <Testcase tcase={currentTestCase} />}
        </div>
      )}
    </div>
  );
};

export default Output;
