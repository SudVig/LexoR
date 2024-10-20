import React from 'react';

const Testcase = ({ tcase }) => {


  function Display({ tinput }) {
    // Check if tinput is defined and a string
    if (!tinput || typeof tinput !== 'string') {
      return <div>No input available.</div>;
    }

    const elements = tinput.split('#'); // Split by '#' to get different input sets

    return (
      <div className='scroll-my-0.5'>
        {elements.map((element, index) => {
          const inputs = element.split(',').map(item => item.trim());

          return (
            <div key={index}>
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
      return <div>No output available.</div>;
    }

    const elements = tinput.split('\n'); // Split by '\n' to get different input sets

    return (
      <div>
        {elements.map((element, index) => {
          const inputs = element.split(',').map(item => item.trim());

          return (
            <div key={index}>
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
    <div className='text-white '>
      <h2 className='py-3'>Input</h2>
      <div className='p-2 bg-slate-600'>
        <Display tinput={tcase.tinput} />
      </div>

      <div className='flex gap-2'>
        <div className='w-1/2 max-h-10'>
          <h2 className='py-3'>Your Output</h2>
          <p className='bg-slate-600 p-2'>
            <Display1 tinput={tcase.output} />
          </p>
        </div>
        <div className='w-1/2'>
          <h2 className='py-3'>Expected Output</h2>
          <div className='p-2 bg-slate-600'>
            <Display tinput={tcase.toutput} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testcase;
