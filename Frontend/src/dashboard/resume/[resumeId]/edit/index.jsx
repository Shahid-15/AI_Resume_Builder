import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../components/FormSection';
import PreviewSection from '../../components/PreviewSection';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import dummyData from '../../../../../../data';
import emptyData from '../../../../../../emptydata'
import axios from 'axios';

const EditResume = () => {
    const params = useParams();
    const [resumeInfo,setResumeInfo] = useState(emptyData);
    const resumeId = params.resumeId;


    useEffect(()=>{
       console.log(dummyData)
       console.log("Resume id is ",params.resumeId)
       GetResumeInfo();
    },[])

  const GetResumeInfo =async ()=>{
   
    let response = await axios.get(`http://localhost:3000/getAllInfo/${resumeId}`)
     
    if(response.status==200){

      setResumeInfo(response.data)
      console.log("Yes i am here")
      console.log("This data you have to see ",response.data)
    }
    else{
      setResumeInfo(emptyData)
      console.log(response.data)
    }
    
  
       
  }

  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>

    <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>

    {/* Form section */}
    <FormSection/>

    {/* previewSection */}
    <PreviewSection/>

    </div>

    </ResumeInfoContext.Provider>
  )
}

export default EditResume