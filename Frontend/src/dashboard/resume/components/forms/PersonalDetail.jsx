import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';

import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

const PersonalDetail = ({enableNext}) => {
    
  const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
  const [formData,setFormData] = useState({})
  const [resumeId,setResumeId] = useState();
  const [loading,setLoading] = useState(false);
  const params = useParams();


  useEffect(()=>{
     
    setResumeId(params.resumeId);


  },[])


const handleInputChange  = (e)=>{
  // enableNext(false);
  
const {name,value} = e.target;

setFormData(
  {
    ...formData,
  [name]:value
  }
)

setResumeInfo({
  ...resumeInfo,
  [name] : value
})

}

const onSave = async (e)=>{
e.preventDefault();
setLoading(true)

if(formData){
  console.log("Form data is ",formData)

let response = await axios.put(`http://localhost:3000/${resumeId}`,formData);
console.log("Form data is ",formData);



if(response.status == 200){

  // enableNext(true);
  setLoading(false);
  toast("Details Updated")

  console.log(response.data)
}
else{
  setLoading(false);
}

}
else{
  console.log("form data is not present")
}
 

}

  return (
    <div className='p-5 shadow-xl rounded-xl border-t-primary border-t-4 mt-6'>
        <h2 className='font-bold text-lg'>Personal Details</h2>
        <p>Get Started with the basic information</p>

        <form onSubmit={onSave} action="">
          <div className='grid grid-cols-2 mt-5 gap-3'>
            <div>
              <label className='text-sm font-semibold ' htmlFor="">First Name</label>
              <Input defaultValue={resumeInfo?.firstname} className='rounded-[5px] shadow-md border-slate-400 hover:border-blue-500 cursor-pointer hover:border-2' required onChange={handleInputChange} name="firstname"/>
            </div>

            <div>
              <label className='text-sm font-semibold' htmlFor="">Last Name</label>
              <Input  defaultValue={resumeInfo?.lastname} className='rounded-[5px] shadow-md border-slate-400 hover:border-blue-500 cursor-pointer hover:border-2' required onChange={handleInputChange} name="lastname"/>
            </div>

            <div className='col-span-2'>
              <label className='text-sm font-semibold' htmlFor="">Job Title</label>
              <Input  defaultValue={resumeInfo?.jobtitle} className='rounded-[5px] shadow-md border-slate-400 hover:border-blue-500 cursor-pointer hover:border-2' required onChange={handleInputChange} name="jobtitle"/>
            </div>

            <div className='col-span-2'>
              <label className='text-sm font-semibold' htmlFor="">Address</label>
              <Input  defaultValue={resumeInfo?.address} className='rounded-[5px] shadow-md border-slate-400 hover:border-blue-500 cursor-pointer hover:border-2' required onChange={handleInputChange} name="address"/>
            </div>

            <div className=''>
              <label className='text-sm font-semibold' htmlFor="">Phone</label>
              <Input  defaultValue={resumeInfo?.phone} className='rounded-[5px] shadow-md border-slate-400 hover:border-blue-500 cursor-pointer hover:border-2' required onChange={handleInputChange} name="phone"/>
            </div>

            <div className=''>
              <label className='text-sm font-semibold' htmlFor="">Email</label>
              <Input  defaultValue={resumeInfo?.email} className='rounded-[5px] shadow-md border-slate-400 hover:border-blue-500 cursor-pointer hover:border-2' required onChange={handleInputChange} name="email"/>
            </div>
           
          </div>
          <div className='mt-3 w-full flex justify-end '>
              <Button
              disabled={loading}
               type="submit" className='text-white rounded-xl w-20'>
                {loading?<LoaderCircle className='animate-spin'/>:"Save"}
               </Button>
            </div>

        </form>
    </div>
  )
}

export default PersonalDetail