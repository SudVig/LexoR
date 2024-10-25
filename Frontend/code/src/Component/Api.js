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

  



