import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { toast } from 'sonner';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';


const formField = {

    title:'',
    companyName:'',
    city:'',
    state:'',
    startDate:'',
    endDate:'',
    workSummary:''
}

const Experience = ({enableNext}) => {

    const [experienceList,setExperienceList] = useState([formField]);
    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
    const [loading,setLoading] = useState(false)
    const params = useParams();

   

    useEffect(() => {
        if (resumeInfo?.experience && resumeInfo.experience.length > 0) {
            setExperienceList([...resumeInfo?.experience]); // Spread to avoid direct mutation
        }

        // enableNext(false)
    }, []);


    useEffect(()=>{
      setResumeInfo({
        ...resumeInfo,
        experience:experienceList
      })
      
    },[experienceList])      
    
    

    const AddNewExperience = ()=>{

        setExperienceList([...experienceList,{...formField}])
    }

    const RemoveExperience = ()=>{

        setExperienceList(experienceList=>experienceList.slice(0,-1))
    }

    const handleChange = (index,event)=>{

         const newEntries = experienceList.slice();
         const {name,value} = event.target;
         newEntries[index][name] = value;
         setExperienceList(newEntries);
    }

    const handleRichTextEditor = (e,name,index)=>{
       
        const newEntries = experienceList.slice();
        newEntries[index][name] = e.target.value
        setExperienceList(newEntries)
             
    }

    const onSave =async  ()=>{
        setLoading(true);

        console.log(experienceList)

        if(experienceList){

    
        let response = await axios.put(`http://localhost:3000/storeExperience/${params.resumeId}`,experienceList);

        console.log("Response datais ",response.data)
        if(response.status==200){
        toast("Details Updated")
        setLoading(false)
        enableNext(true)

        }
        }
        else{
            toast("Server error")
        }


    }


  return (
    <div>
          <div className='p-5 shadow-xl rounded-xl border-t-primary border-t-4 mt-6'>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add Your Previous Job Experience</p>

        <div>
            {experienceList.map((item,index)=>(

                <div key={index}>
                    <div className='grid grid-cols-2 gap-3 border -3 my-5 rounded-xl'>
                        <div className=''>
                            <label className='text-xs'>Position Title</label>
                            <Input defaultValue={item?.title} className='rounded-[5px] shadow-md border-slate-400 hover:border-blue-500 cursor-pointer hover:border-2' name="title" onChange={(event)=>handleChange(index,event)}/>
                        </div>

                        <div className=''>
                            <label className='text-xs'>Company Name</label>
                            <Input defaultValue={item?.companyName} className='rounded-[5px] shadow-md border-slate-400 hover:border-blue-500 cursor-pointer hover:border-2' name="companyName" onChange={(event)=>handleChange(index,event)}/>
                        </div>

                        <div className=''>
                            <label className='text-xs'>City</label>
                            <Input defaultValue={item?.city} className='rounded-[5px] shadow-md border-slate-400 hover:border-blue-500 cursor-pointer hover:border-2' name="city" onChange={(event)=>handleChange(index,event)}/>
                        </div>

                        <div className=''>
                            <label className='text-xs'>State</label>
                            <Input defaultValue={item?.state} className='rounded-[5px] shadow-md border-slate-400 hover:border-blue-500 cursor-pointer hover:border-2' name="state" onChange={(event)=>handleChange(index,event)}/>
                        </div>

                        <div className=''>
                            <label className='text-xs'>Start Date</label>
                            <Input defaultValue={item?.startDate} className='rounded-[5px] shadow-md border-slate-400 hover:border-blue-500 cursor-pointer hover:border-2' type="date" name="startDate" onChange={(event)=>handleChange(index,event)}/>
                        </div>

                        <div className=''>
                            <label className='text-xs'>End Date</label>
                            <Input defaultValue={item?.endDate} className='rounded-[5px] shadow-md border-slate-400 hover:border-blue-500 cursor-pointer hover:border-2' type="date" name="endDate" onChange={(event)=>handleChange(index,event)}/>
                        </div>
                        <div className='col-span-2'>
                            <RichTextEditor
                            index={index} 
                            defaultValue={item?.workSummary}
                            onReachTextEditorChange={(event)=>handleRichTextEditor(event,"workSummary",index)} />
                        </div>
                        
                    </div>e
                    </div>
            ))}
        </div>

        <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button onClick={AddNewExperience} className='text-primary' variant="outline">+Add More Experience</Button>
            <Button onClick={RemoveExperience} className='text-primary' variant="outline">-Remove</Button>

            </div>
            <Button 
            disabled={loading}
            onClick={onSave} className='text-white w-24 rounded-xl'>
                
                {loading?<LoaderCircle className='animate-spin'/>:"Save"}
            </Button>
        </div>


        </div>
    </div>
  )
}

export default Experience