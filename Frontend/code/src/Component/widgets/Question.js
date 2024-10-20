import React, { useEffect, useState, useContext } from 'react';
import { getisSolved, getQuestion } from '../Api';
import { UserContext } from '../../App';
import { RingLoader } from 'react-spinners';

function Question({ qid, testcase = [] }) {
  const { loginId } = useContext(UserContext);
  const [solved, setSolved] = useState(false);
  const [ques, setQues] = useState({});
  const [loading, setLoading] = useState(true);

  function Display({ tinput }) {
    const elements = tinput.split('#');
    return (
      <div>
        {elements.map((element, index) => {
          const inputs = element.split(',').map(item => item.trim());
          return (
            <div key={index} className="py-1">
              {inputs.map((input, inputIndex) => (
                <span key={inputIndex}>{input}&nbsp;</span>
              ))}
            </div>
          );
        })}
      </div>
    );
  }

  // Determine the background color based on the problem level
  const getLevelColor = (plevel) => {
    switch (plevel) {
      case 'Easy':
        return 'bg-green-500';
      case 'Medium':
        return 'bg-orange-500';
      case 'Hard':
        return 'bg-red-500';
      default:
        return 'bg-gray-700';
    }
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const temp = await getQuestion(qid);
        console.log("Fetched question:", temp); // Debug log
        setQues(temp);
      } catch (error) {
        console.error("Error fetching question:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [qid]);

  useEffect(() => {
    const fetchSolvedStatus = async () => {
      if (loginId && qid) {
        try {
          const val = await getisSolved(loginId, qid);
          console.log("Solved status:", val); // Debug log
          setSolved(val.issolved);
        } catch (error) {
          console.error("Error fetching solved status:", error);
        }
      }
    };

    fetchSolvedStatus();
  }, [qid, loginId]);

  const sampleTestCases = testcase.filter((testCase) => testCase.status === 'sample');

  return loading ? (
    <div className="w-full h-screen flex justify-center items-center">
      <RingLoader color="#ffffff" />
    </div>
  ) : (
    <div className="min-h-screen bg-slate-800 sm:w-full text-white p-10 h-full md:overflow-auto">
      <div>
        <div className="flex flex-col">
          <h1 className="font-bold text-2xl flex justify-between items-center w-full">
            {ques.pname}
            {solved && (
              <span
                className="ml-2 bg-green-500 text-white rounded-full px-2 text-xs md:text-sm"
                style={{ animation: 'pulse 1s infinite' }}
              >
                Solved
              </span>
            )}
          </h1>
          <span
            className={`mt-1 ${getLevelColor(ques.plevel)} text-white rounded-full px-3 py-0.5 text-xs md:text-sm w-fit`}
          >
            {ques.plevel}
          </span>
        </div>
        <p className="py-3">{ques.pdesc}</p>
        <br />
        <hr className="py-1" />
        <h2 className="font-bold text-lg pt-3">Inputs</h2>
        <p className="py-1">{ques.pinput}</p>

        <h2 className="font-bold text-lg pt-3">Output</h2>
        <p className="py-1">{ques.poutput}</p>

        <h2 className="font-bold text-lg pt-3">Constraints</h2>
        <p className="py-1">{ques.pconstraint}</p>

        <br />
        <hr />
        {sampleTestCases.length > 0 ? (
          sampleTestCases.map((testCase, index) => (
            <div key={index} className="my-4">
              <h4 className="font-bold">Test Case {index + 1}</h4>
              <div className="font-bold">Input</div>
              <Display tinput={testCase.tinput} />
              <div className="font-bold">Output</div>
              <Display tinput={testCase.toutput} />
            </div>
          ))
        ) : (
          <div>No sample test cases found</div>
        )}
      </div>
    </div>
  );
}

export default Question;
