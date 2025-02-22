import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';

function Education({enableNext}) {

    const [loading,setLoading] = useState(false);
    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
    const params = useParams();

    const [educationList,setEducationList] = useState([{
        institution:'',
        degree:'',
        major:'',
        startDate:'',
        endDate:'',
        workSummary:''
    }]);

    useEffect(()=>{
    //   enableNext(false);
    },[])


    useEffect(()=>{

        setResumeInfo({
            ...resumeInfo,
            education:educationList
        })

    },[educationList])

    useEffect(() => {
        if (resumeInfo?.education && resumeInfo.education.length > 0) {
            setEducationList([...resumeInfo?.education]); // Spread to avoid direct mutation
        }
    }, []);
    
    

    const handleChange = (event,index)=>{

        const newEntries = educationList.slice();
        const {name,value} = event.target;
        newEntries[index][name] = value;
        setEducationList(newEntries);
    }

    const AddNewEducation = ()=>{

     setEducationList([
        ...educationList,
        {
            institution:'',
            degree:'',
            major:'',
            startDate:'',
            endDate:'',
            workSummary:''
        }
     ])
    }

    const RemoveEducation = ()=>{
        
        setEducationList(educationList=>educationList.slice(0,-1))
    }

    const onSave = async ()=>{
        setLoading(true);

       const resumeId = params.resumeId;

       if(educationList){
        let response = await axios.put(`http://localhost:3000/storeEducation/${resumeId}`,educationList);
        if(response.status==200){

            console.log(response.data)
            setLoading(false);
            toast("Details updated")
            enableNext(true);
        }
        else{
            toast("Server error failed");
            enableNext(false);
            setLoading(false);  
        }
       }


    }

  return (
       
       <div>
          <div className='p-5 shadow-xl rounded-xl border-t-primary border-t-4 mt-6'>
        <h2 className='font-bold text-lg'>Education</h2>
        <p>Add Your Education Details</p>

        <div>
            {educationList.map((item,index)=>(

                <div key={index}>
                    <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-xl'>
                        <div className='col-span-2'>
                            <label htmlFor="">University Name</label>
                            <Input defaultValue={item?.institution} className='rounded-[5px] shadow-md border-slate-400 hover:border-blue-500 cursor-pointer hover:border-2' name="institution" onChange={(e)=>{handleChange(e,index)}}/>

                        </div>
                        
                        <div>
                            <label htmlFor="">degree</label>
                            <Input defaultValue={item?.degree} className='rounded-[5px] shadow-md border-slate-400 hover:border-blue-500 cursor-pointer hover:border-2' name="degree" onChange={(e)=>{handleChange(e,index)}}/>

                        </div>

                        <div>
                            <label htmlFor="">Major</label>
                            <Input defaultValue={item?.major} className='rounded-[5px] shadow-md border-slate-400 hover:border-blue-500 cursor-pointer hover:border-2' name="major" onChange={(e)=>{handleChange(e,index)}}/>

                        </div>

                        <div>
                            <label htmlFor="">Start Date</label>
                            <Input defaultValue={item?.startDate} className='rounded-[5px] shadow-md border-slate-400 hover:border-blue-500 cursor-pointer hover:border-2' type="date" name="startDate" onChange={(e)=>{handleChange(e,index)}}/>

                        </div>

                        <div>
                            <label htmlFor="">End Date</label>
                            <Input defaultValue={item?.endDate} className='rounded-[5px] shadow-md border-slate-400 hover:border-blue-500 cursor-pointer hover:border-2' type="date" name="endDate" onChange={(e)=>{handleChange(e,index)}}/>

                        </div>

                        <div >
                            <label htmlFor="">Description</label>
                            <Textarea defaultValue={item?.workSummary} className='rounded-[5px] shadow-md border-slate-400 hover:border-blue-500 cursor-pointer hover:border-2'  name="workSummary" onChange={(e)=>{handleChange(e,index)}}/>

                        </div>

                    </div>
                </div>
                
            ))}

            
        </div>

        
        <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button onClick={AddNewEducation} className='text-primary' variant="outline">+Add More Education</Button>
            <Button onClick={RemoveEducation} className='text-primary' variant="outline">-Remove</Button>

            </div>

            <Button
              disabled={loading} onClick={()=>onSave()}
               type="submit" className='text-white rounded-xl w-20'>
                {loading?<LoaderCircle className='animate-spin'/>:"Save"}
               </Button>
        </div>
        

        </div>
      
    </div>
  )
}

export default Education
