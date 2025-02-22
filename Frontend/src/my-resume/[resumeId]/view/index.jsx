import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import PreviewSection from '@/dashboard/resume/components/PreviewSection'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { RWebShare } from 'react-web-share'

function ViewResume() {
  const [resumeInfo,setResumeInfo] = useState();
  const {resumeId} = useParams();

  useEffect(()=>{
    
    GetResumeInfo()

  },[])

  const GetResumeInfo =async ()=>{
    
    let response = await axios.get(`http://localhost:3000/getAllInfo/${resumeId}`)

    console.log(response.data)
    setResumeInfo(response.data)

  }

  const HandleDownload = ()=>{

    window.print();
  }

  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
      <div id='no-print'>
      <Header/>
      
      <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
        <h2 className='text-center text-2xl font-semibold m'>Congrats! Your Ultimate AI Generated Resume is Ready</h2>
        <p className='text-center text-gray-400'>Now you are ready to download your resume and you can share unique resume url with your friends and family</p>
        <div className='flex justify-between px-36 my-10'>
          <Button onClick={HandleDownload} className='text-white rounded-xl hover:scale-105'>Download</Button>


           <RWebShare
        data={{
          text: "Hello everyone This is my resume please open url to see",
          url: import.meta.env.VITE_BASE_URL+"/my-resume/"+resumeId+"/view",
          title: resumeInfo?.firstName + " "+ resumeInfo?.lastname+" resumex`",
        }}
        onClick={() => console.log("shared successfully!")}
      >
        
        <Button className='text-white rounded-xl hover:scale-105'>Share 🔗</Button>
      </RWebShare>
         
        </div>
        </div>

        
  
      </div>
      <div className='my-10 mx-10 md:mx-20 lg:mx-36'>

      <div id='print-area' >
          <PreviewSection/>
        </div>

      </div>

      
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume
