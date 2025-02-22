import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Brain, LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import { AIchatSession } from '@/service/AIModel'

const prompt = "Job Title:full {jobtitle},Depends on job title give me summary for my resume within 4-5 lines in JSON format with field experience level and summary with experience for fresher,Mid-level,Experienced"
const Summary = ({enableNext}) => {

const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext)
const [summary,setSummary] = useState()
const [loading,setLoading] = useState(false);
const params = useParams();
const [aiGeneratedSummaryList,setAiGenereatedSummaryList] = useState(); 
const resumeId= params.resumeId;

useEffect(()=>{

    // enableNext(false);

},[])

const generateSummaryFromAI =async  ()=>{
     setLoading(true);
    const PROMPT = prompt.replace('{jobtitle}',resumeInfo?.jobtitle);
    console.log("Prompt is ",PROMPT);

  const result = await AIchatSession.sendMessage(PROMPT);

  setAiGenereatedSummaryList(JSON.parse(result.response.text()))
  setLoading(false);
}


const onSave = async (e)=>{

e.preventDefault();
setLoading(true);

//store the summary in the database all done 

let response = await axios.put(`http://localhost:3000/storeSummary/${resumeId}`,{summary})

if(response.status==200){

    setLoading(false);
    enableNext(true);
    toast("Details Updated")
    console.log("Summary stored")
}
else{
    setLoading(false)
}

}

useEffect(()=>{

},[])

useEffect(()=>{

    summary&&setResumeInfo({
        ...resumeInfo,
        summary:summary
})

},[summary])

  return (
    <div>
         <div className='p-5 shadow-xl rounded-xl border-t-primary border-t-4 mt-6'>
        <h2 className='font-bold text-lg'>Summary</h2>
        <p>Add summary for you job title</p>
        <form onSubmit={onSave} className='mt-7'>
            <div className='flex justify-between items-end'>

            <label htmlFor="">Add Summary</label>
            <Button onClick={generateSummaryFromAI} type="button" variant="outline" className='border-primary rounded-[4px] border-[1.5px] text-purple-700 flex gap-2 font-semibold' size="sm"> <Brain/>Generate From AI</Button>

            </div>
            <Textarea required defaultValue={resumeInfo?.summary}
            onChange={(e)=>{setSummary(e.target.value)}}
            className='mt-5 rounded-[5px] shadow-md border-slate-400 hover:border-blue-500 cursor-pointer hover:border-2 h-32'/>

            <div className='flex justify-end mt-2'>
            <Button
              disabled={loading}
               type="submit" className='text-white rounded-xl w-20'>
                {loading?<LoaderCircle className='animate-spin'/>:"Save"}
               </Button>
            </div>
        </form>


        {aiGeneratedSummaryList&& <div>
            <h2 className='font-bold text-lg'>Suggesstion</h2>
            {aiGeneratedSummaryList.map((item,idx)=>(

                <div key={idx} className=''>
                    <h2 className='font-bold my-1 :'>Level : {item?.experience_level}</h2>
                    <p>{item?.summary}</p>
                    </div>
            ))}
        </div>}

        </div>

      
       
    </div>
  )
}

export default Summary