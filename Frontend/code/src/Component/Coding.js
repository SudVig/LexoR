import React, { useState, useRef, useEffect, useReducer } from 'react';
import Ide from './widgets/Ide';
import Question from './widgets/Question';
import { CODE_SNIPPETS } from './Constants/Constant';
import { executeCode, getTestcaseById, savecode } from './Api';
import { useParams } from 'react-router';
import { getSnippetById } from './Api';

function Coding() {  
  const [userId,uid]=useState(1);
  const { pblm_id } = useParams();
  const [qid, setqid] = useState(pblm_id);
  const [value, setValue] = useState("");
  const [Language, setLanguage] = useState('java');
  const editorRef = useRef();
  const [resp, setResp] = useState(null);
  const [isErr, setErr] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isRun, setRun] = useState(false);
  const [testcase, setTestcase] = useState([]);
  const [result, setResult] = useState([]);
  
  const [testCasepassed, setTestcasepassed] = useState(0);
  const [totalTestCases, setTotalTestCases] = useState(result.length);
  

  useEffect(() => {
    const fetchCases = async () => {
      const temp = await getTestcaseById(qid);
      setTestcase(temp);
      setTotalTestCases(temp.length);
      try{
      const val=await getSnippetById(qid,Language);
   
      setValue(val.snippets)
      }
      catch(e)
      {
        if(Language==="python")
          setValue("# write your code")
          else
          setValue("// write your code")
      } // Set total test cases based on fetched data
    };
    
  
    fetchCases();

  }, [qid,Language]); // Only depend on qid

  const compile = async (sourceCode, cmdargs) => {
    try {
      const res = await executeCode(Language, sourceCode, cmdargs);
      if (res.run.code === 0) {
        setErr(false);
        return res;
      } else {
        setErr(true);
        
        return res;
      }
    } catch (err) {
      setErr(true);
      console.error(err);
    }
  };

  const runCode = async () => {
    setRun(false);
    setTestcasepassed(0);
    setRun(true);
    setLoading(true);
    const sourceCode = editorRef.current.getValue();

    if (!sourceCode) {
      setLoading(false);
      return; // Exit if there is no source code
    }

    const results = [];
    let local=0;
    for (const element of testcase) {
      const tempObj = { ...element, output: "", err: false, iscorrect: false };

      try {
        const resp = await compile(sourceCode, element.tinput);
        tempObj.output = resp.run.output;
        tempObj.iscorrect = tempObj.output.trim() === element.toutput.trim();
        if (tempObj.iscorrect) {
          local=local+1;
          setTestcasepassed(local);
        }
      } catch (error) {
        console.error(error);
        tempObj.err = true;
        setErr(true) // Mark error state
      }

      results.push(tempObj);
    }
    setResult(results);
    setLoading(false);
    setRun(true);
   

    

   

    if(local===totalTestCases )

    {
      console.log("Going to savve")
      await savecode(Language,value,pblm_id,userId)
      console.log("Saved the code");
    }
  };



  return (
    <div className='min-w-screen bg-slate-900'>
      <div className="flex flex-col md:flex-row h-screen md:overflow-hidden">
        <div className="flex-1 border-gray-200 md:border-b-0">
          <Question qid={qid} testcase={testcase} />
        </div>
        <div className="flex-1 h-full bg-slate-600">
          <Ide
            value={value}
            setValue={setValue}
            Language={Language}
            qid={qid}
            setLanguage={setLanguage}
            editorRef={editorRef}
            totalTestCases={totalTestCases}
            runCode={() => { runCode(); setResult([]); }}
            resp={resp}
            isErr={isErr}
            isLoading={isLoading}
            isRun={isRun}
            setLoading={setLoading}
            setRun={setRun}
            testcase={result}
            settestcase={setTestcase}
            testCasepassed={testCasepassed}
          />
        </div>
      </div>
    </div>
  );
}

export default Coding;
