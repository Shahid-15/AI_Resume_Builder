import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { ArrowLeft, ArrowRight, Home, LayoutGridIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Summary from './forms/Summary'
import Experience from './forms/Experience'
import Education from './forms/Education'
import Skill from './forms/Skill'
import { Link, Navigate, useParams } from 'react-router-dom'
import ThemeColor from './ThemeColor'


const FormSection = () => {

  const [activeFormIndex,setActiveFormIndex] = useState(1);
  const [enableNext,setEnableNext] = useState(true);
  const {resumeId} = useParams();

  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-5'>
          <Link to={'/dashboard'}>
        <Button className='text-white bg-green-500 rounded-xl w-16 shadow-lg'><Home/></Button>
          </Link>
        <ThemeColor/>
       
        </div>
        <div className='flex gap-2'>
          {activeFormIndex>1&&<Button onClick={()=>{setActiveFormIndex(activeFormIndex-1)}} className='text-white w-20 rounded-xl' size="sm"><ArrowLeft/></Button>}
          <Button
          disabled={!enableNext}
           onClick={()=>{setActiveFormIndex(activeFormIndex+1)}} className='flex gap-2 rounded-xl p-4 font-bold text-white' size="sm">Next <ArrowRight/> </Button>
         
        </div>
      </div>
      
      {/* Personal Details */}
     {activeFormIndex==1? <PersonalDetail enableNext={(v)=>setEnableNext(v)}/>

     :activeFormIndex==2?<Summary enableNext={(v)=>setEnableNext(v)}/>
     
     :activeFormIndex==3?<Experience enableNext={(v)=>setEnableNext(v)}  />
     
     :activeFormIndex==4?<Education enableNext={(v)=>setEnableNext(v)} />
     
     :activeFormIndex==5?<Skill enableNext={(v)=>setEnableNext(v)}/>
     
     :activeFormIndex==6?
     <Navigate to={'/my-resume/'+resumeId+'/view'}/>:
     
     null
     }

      

    </div>
  )
}

export default FormSection