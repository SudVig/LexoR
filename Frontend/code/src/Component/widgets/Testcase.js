import React from 'react';

const Testcase = ({ tcase }) => {
  function Display({ tinput }) {
    // Check if tinput is defined and a string
    if (!tinput || typeof tinput !== 'string') {
      return <div className="text-gray-400">No input available.</div>;
    }

    const elements = tinput.split('#'); // Split by '#' to get different input sets

    return (
      <div>
        {elements.map((element, index) => {
          const inputs = element.split(',').map(item => item.trim());
          return (
            <div key={index} className="text-lg text-white"> {/* Increased font size */}
              {inputs.map((input, inputIndex) => (
                <span key={inputIndex}>{input}&nbsp;</span>
              ))}
            </div>
          );
        })}
      </div>
    );
  }

  function Display1({ tinput }) {
    // Check if tinput is defined and a string
    if (!tinput || typeof tinput !== 'string') {
      return <div className="text-gray-400">No output available.</div>;
    }

    const elements = tinput.split('\n'); // Split by '\n' to get different input sets

    return (
      <div>
        {elements.map((element, index) => {
          const inputs = element.split(',').map(item => item.trim());
          return (
            <div key={index} className="text-lg text-white"> {/* Increased font size */}
              {inputs.map((input, inputIndex) => (
                <span key={inputIndex}>{input}&nbsp;</span>
              ))}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="text-white">
      <h2 className="py-3 text-xl font-semibold">Input</h2> {/* Increased font size */}
      <div className="p-2 bg-slate-600 rounded-md">
        <Display tinput={tcase.tinput} />
      </div>

      <div className="flex gap-4 mt-4">
        <div className="w-1/2">
          <h2 className="py-3 text-xl font-semibold">Your Output</h2> {/* Increased font size */}
          <div className="p-2 bg-slate-600 rounded-md">
            <Display1 tinput={tcase.output} />
          </div>
        </div>
        <div className="w-1/2">
          <h2 className="py-3 text-xl font-semibold">Expected Output</h2> {/* Increased font size */}
          <div className="p-2 bg-slate-600 rounded-md">
            <Display tinput={tcase.toutput} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testcase;
