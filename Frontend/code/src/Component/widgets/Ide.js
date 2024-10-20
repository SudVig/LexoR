import React from 'react';
import Editor from '@monaco-editor/react';
import Languageselector from './Languageselector';
import { FaPlay } from 'react-icons/fa';
import Output from './Output';
import { getSnippetById } from '../Api';

function Ide({ 
  value, setValue, qid, Language, setLanguage, editorRef, 
  runCode, isLoading, isRun, setLoading, setRun, 
  isErr, resp, testcase, settestcase, testCasepassed, 
  totalTestCases 
}) {
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.updateOptions({
      fontSize: 16,
      lineHeight: 1.5,
      scrollBeyondLastLine: false,
      readOnly: false,
    });
  };

  const onSelect = async (language) => {
    setLanguage(language);
    try {
      const val = await getSnippetById(qid, language);
      setValue(val.snippets);
    } catch {
      setValue(language === "python" ? "# write your code" : "// write your code");
    }
  };

  return (
    <div className='min-h-screen relative bg-slate-900 sm:w-full overflow-hidden'>
      <div className='flex flex-row justify-between items-center px-5'>
        <Languageselector Language={Language} onSelect={onSelect} />
        <p className='flex text-green-200'>
          Run &nbsp;<FaPlay onClick={runCode} style={{ cursor: 'pointer' }} className='text-green-300' size={25} />
        </p>
      </div>
      <Output      
        resp={resp} 
        iserr={isErr}
        isLoading={isLoading}
        isRun={isRun}
        setLoading={setLoading}
        setRun={setRun}
        testcase={testcase}
        settestcase={settestcase}
        testCasepassed={testCasepassed}
        totalTestCases={totalTestCases}
      />
      <div style={{ width: '100%', height: '93vh' }}>
        <Editor 
          height="100%" 
          language={Language}
          theme='vs-dark'
          value={value} 
          onMount={onMount}
          onChange={(value) => setValue(value)}
          options={{
            automaticLayout: true,
            minimap: { enabled: false },
            fontSize: 16,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            tabSize: 2,
            wordWrap: 'on',
            contextMenu: true,
            readOnly: false, // Ensure editor is editable
          
          }}
        />
      </div>
    </div>
  );
}

export default Ide;
