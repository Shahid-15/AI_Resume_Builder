import { LoaderCircle, MoreVertical, Notebook, Pen } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner'



const ResumeCard = ({resume,refreshData}) => {

  const navigation = useNavigate();
  const [openAlert,setOpenAlert] = useState(false);
  const [loading,setLoading]=useState(false);



  const onDelete =async  ()=>{

      setLoading(true)
    const response = await axios.delete(`http://localhost:3000/deleteResume/${resume?.resumeId}`)
    console.log(response.data)

    if(response.status==200){

      toast("Resume deleted!");
      setOpenAlert(false);
      refreshData();
      setLoading(false)
    }
    else{
      setLoading(false);
    }
    
  }
  return (
    <div>

    <Link to={'/dashboard/resume/'+resume.resumeId+'/edit'} >
    <div  className='border-t-8 border-blue-500 p-14 py-24 shadow-lg flex justify-center items-center bg-gradient-to-r from-pink-500 to-purple-400
        
         h-[210px] hover:scale-105 transition-all hover:border-green-500 cursor-pointer'>
      {/* <Notebook/> */}
      <img src="/book2.png" width={70} height={70} alt="" />

    </div>
    </Link>

    <div className='border flex text-white border-none justify-between items-center mt-[-10px]'
    
    style={{
      background:resume?.themecolor
    }}>

    <h2 className='p-2 text-center my-1'>{resume.title}</h2>
   
    <DropdownMenu >
  <DropdownMenuTrigger asChild>
  <MoreVertical/>
  </DropdownMenuTrigger>
  <DropdownMenuContent className='bg-white'>
    <DropdownMenuItem className='cursor-pointer' onClick={()=>navigation('/dashboard/resume/'+resume.resumeId+'/edit')}> <Pen/>Edit</DropdownMenuItem>
    <DropdownMenuItem onClick={()=>navigation('/my-resume/'+resume.resumeId+'/view')}>View</DropdownMenuItem>
    <DropdownMenuItem onClick={()=>navigation('/my-resume/'+resume.resumeId+'/view')}>Download</DropdownMenuItem>
    <DropdownMenuItem disabled={loading} onClick={()=>setOpenAlert(true)}>
      {loading?<LoaderCircle className='animate-spin'/>:"Delete"}
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

<AlertDialog open={openAlert}>

  <AlertDialogContent className='bg-white'>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={()=>setOpenAlert(false)}>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    </div>  
   
  
  
          </div>
  )
}

export default ResumeCard