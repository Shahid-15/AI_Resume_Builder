import React, { useContext, useEffect, useRef } from 'react'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from '@/components/ui/button';
import { LayoutGridIcon } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
  

const ThemeColor = () => {

    const button = useRef(null);
    const {resumeId} = useParams();

    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext)

    const colors = [
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
        "#33FFF5", "#FF8C33", "#8C33FF", "#33FFA1", "#A1FF33",
        "#FF3333", "#33FFD1", "#FFDB33", "#DB33FF", "#33A1FF",
        "#A1DB33", "#33FF8C", "#FF33DB", "#DBFF33", "#338CFF"
      ];

      useEffect(()=>{

        button.current.style.backgroundColor=resumeInfo?.themecolor;
      },[resumeInfo?.themecolor])

      const onColorSelect = async (color)=>{
          
setResumeInfo({
    ...resumeInfo,
    themecolor:color
})



button.current.style.color='white'

let response = await axios.put(`http://localhost:3000/updateTheme/${resumeId}`,{color})

if(response.status==200){

  toast("Theme Color Updated")
}

      }
       
  return (

        
<Popover>   

  <PopoverTrigger asChild>
  <Button ref={button} size="sm" className='text-white flex gap-2 bg-[#3498db] hover:scale-105 rounded-xl'><LayoutGridIcon/>Theme</Button>
  </PopoverTrigger>
  <PopoverContent className=' rounded-xl bg-zinc-800'>
    <h2 className='text-white font-bold text-center'>Select Theme Color</h2>

  <div className='grid grid-cols-5 gap-4  p-2 rounded-xl'>
    {colors.map((item,idx)=>(
        
            
        <div
        onClick={()=>onColorSelect(item)}
         className='hover:border-2 hover:border-white  cursor-pointer h-6 w-6 rounded-full shadow-sm' 
        style={{backgroundColor:item}}>

        </div>
    ))}
    </div>
  </PopoverContent>
</Popover>

    
  )
}

export default ThemeColor