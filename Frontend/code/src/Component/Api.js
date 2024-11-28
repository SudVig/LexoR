import axios from "axios"
import {LANGUAGE_VERSIONS} from "./Constants/Constant"

const API=axios.create(

   {
     baseURL: "https://emkc.org/api/v2/piston"
   } 
   
)

export const executeCode =async (language, sourceCode,cmdargs)=>
{
    const response=await API.post("/execute",{
        "language": language,
  "version": LANGUAGE_VERSIONS[language],
  "files": [
    {
      
      "content": sourceCode
    }
  ],
  "args": [cmdargs],
    })

    return response.data;
}


const DB_API=axios.create(
  {
     //baseURL:"https://lexor-1.onrender.com/"
     baseURL:"http://127.0.0.1:8000/"
   
  }
)

// export const fetchData=()=>{
//   fetch('http://127.0.0.1:8000/problems/',{method:'GET'})
//   .then(response=> {
//   if(!response.ok){
//     throw new Error(`HTTP error! Status: ${response.status}`)
//   } 
//   return response.json();
//   }).then(data=>{
//     console.log(data);
//   })
//   .catch(err=>{
//     console.error(err)
//   })
// }

export const getProblems=async ()=>{

  const response=await DB_API.get("problems/")
  console.log(response.data);
  return response.data

}


export const getQuestion=async (qid)=>{

  const response=await DB_API.get("problems/"+qid+"/")
  console.log(response.data);
  return response.data

}

export const getTestcaseById=async (qid)=>{

  const response=await DB_API.get("testcases/"+qid+"/")
  console.log(response.data);
  return response.data

}

export const getSnippetById=async (qid,lang)=>{

  const response=await DB_API.get("snippets/"+qid+"/"+lang+"/")
  console.log(response.data);
  return response.data

}


export const savecode =async (language, sourceCode,pid,uid,issolved)=>
  {

    console.log({
      "pid":pid,
      "uid":uid,
      "code":sourceCode,
      "lang":language,
      "issolved":issolved
  });
      const response=await DB_API.post("solved/",{
          "pid":pid,
          "uid":uid,
          "code":sourceCode,
          "lang":language,
          "issolved":issolved
      })
  
      return response.data;
  }


  export const verifyUser=async (email,password)=>
  {
    const response = await DB_API.get("verify/"+email+"/"+password+"/")

    return response.data

  }


  export const createUser = async (name,email,password)=>{

    const response=await DB_API.post("user/",{
      "name":name,
      "email":email,
      "password":password
    })

    return response.data;

  }


  export const getProfileById=async (qid)=>{

    const response=await DB_API.get("profile/"+qid+"/")
    console.log(response.data);
    return response.data
  
  }


  export const getProblemswithStatus=async (uid)=>{

    const response=await DB_API.get("problem-status/"+uid+"/")
    console.log(response.data);
    return response.data
  
  }

  export const getisSolved=async (uid,pid)=>{

    const response=await DB_API.get("issolved/"+uid+"/"+pid+"/")
    
    return response.data
  
  }

  const GEMINI_API_KEY = "AIzaSyBHTnvC5tT88M5Zpi4cx5RWzi-dB8a-QIQ";

// Creating Axios instance for Gemini API
const GEMINI_API = axios.create({
  baseURL: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
});
// Function to fetch AI suggestions for code analysis
export const getAISuggestions = async (code) => {
  try {
    const response = await GEMINI_API.post(
      `?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Please analyze the following code carefully and provide a detailed, structured report. Here's what I'd like you to focus on:

1. **Code Overview**: Provide a brief overview of what the code is attempting to accomplish, focusing on its overall logic. Exclude repeating the main function, but highlight key areas of the code.

2. **Error Detection**:
   - Look for **syntax errors**, **illegal expressions**, **undefined variables**, and **incorrect assignments**.
   - For any line that contains an error, **clearly indicate the line number** and describe what the issue is. If there's an illegal expression, explain why it's incorrect and provide hints on how to fix it.
   - Check if there are any **runtime exceptions** that could occur, such as **null references**, **undefined properties**, or **incorrect type usage** (like string methods being used on numbers).
   - If there's any **missing imports** or **undeclared dependencies**, point them out as well.

3. **Variable and Function Analysis**:
   - Analyze all **variable names** for consistency, clarity, and whether they follow good naming conventions. If a variable is poorly named or misleading, suggest a better name.
   - Check for **variable scope issues**: Are there variables being **shadowed**? Are any variables being overwritten unexpectedly?
   - Make sure **functions** and **variables** are used properly, and suggest improvements if any part of the code is inefficient or unclear.

4. **Time Complexity and Optimization**:
   - Analyze the **time complexity** of any loops or recursive functions. Provide an estimation of the **big O notation** where relevant, especially for performance-critical sections.
   - Suggest **optimizations** where applicable. For example, if you find redundant calculations, suggest a more efficient approach or recommend using better data structures.

5. **Edge Case Handling**:
   - Identify if the code handles any **edge cases**, such as invalid input, empty arrays, null values, or out-of-bounds errors.
   - If edge cases are not handled, suggest how the code can be updated to handle them robustly (e.g., input validation, boundary checks).

6. **Suggestions for Code Quality**:
   - Recommend improvements in **code readability**, **maintainability**, or **organization**. For example, suggest breaking down large functions, improving comments, or restructuring code for clarity.
   - Point out any **redundant code** or **repetitive logic** that could be refactored into a reusable function.

7. **Overall Feedback**:
   - If the code is already well-optimized, and no major issues exist, simply state, “The code looks good; there are no critical issues.”
   - If the code is fundamentally flawed, provide specific **debugging hints** for fixing the most critical issues.

8. **Additional Recommendations**:
   - If there are **security vulnerabilities** (e.g., SQL injection risks, improper handling of user input), please point them out and suggest improvements.
   - Suggest any **best practices** that can help improve the quality of the code or its execution (e.g., error handling, async patterns, etc.).

Here is the code you need to analyze:
${code}`,
              },
            ],
          },
        ],
      }
    );
    return response.data; // Return the AI-generated response
  } catch (error) {
    console.error("Error fetching suggestions from Gemini API:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
};
