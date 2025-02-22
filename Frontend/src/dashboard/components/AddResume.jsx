import { Loader, Loader2, LoaderCircleIcon, PlusSquare, PlusSquareIcon } from 'lucide-react'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
  
const AddResume = () => {

    const [openDialog,setOpenDialog] = useState(false);
    const [resumeTitle,setResumeTitle] = useState();
    const {user} = useUser();
    const [loading,setLoading] = useState(false);
    const navigation = useNavigate();

    const onCreate = async ()=>{
      setLoading(true)

        const resumeId = uuidv4();
        const title = resumeTitle;
        const userEmail = user?.primaryEmailAddress?.emailAddress;
        const userName = user?.fullName;

        const data = {
          resumeId,
          title,
          userEmail,
          userName,
          themecolor: "#3498db",
          
        }

      //Store the resume details along with title email ans so on
      const response = await axios.post(`http://localhost:3000/store`,data);
      console.log(response.data)
      if(response.status==200){

        setLoading(false);
        navigation('/dashboard/resume/'+resumeId+'/edit')
      }
      else{
        setLoading(false)
      }


    }

  return (
    <div>
        <div onClick={()=>{setOpenDialog(true)}}
         className='p-14 py-24 border-2 border-slate-200 shadow-lg flex justify-center items-center bg-slate-200
        
        rounded-xl h-[246px] hover:scale-105 transition-all hover:border-blue-300 cursor-pointer'>
            <PlusSquare/>
        </div>
     
        <Dialog  open={openDialog}>
 
  <DialogContent className='text-black bg-slate-200'>
    <DialogHeader>
      <DialogTitle>Create new resume</DialogTitle>
      <DialogDescription>
        <span className='opacity-75'>Add title for you new resume</span>
       <Input onChange={(e)=>{setResumeTitle(e.target.value)}}  className='rounded-xl my-4 ' placeholder="Ex.Full Stack Resume"/>
      </DialogDescription>
      <div className='flex justify-end gap-5'>
        <Button onClick={()=>{setOpenDialog(false)}}  className='rounde-xl' variant="ghost">Cancel</Button>
        <Button
        disabled={!resumeTitle || loading}

         onClick={onCreate} className='rounded-xl text-white'>

          {loading?<Loader2 className='animate-spin'/>:"Create"}
          </Button>
      </div>
    </DialogHeader>
  </DialogContent>
</Dialog>

  


    </div>
  )
}

export default AddResume