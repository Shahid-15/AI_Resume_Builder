import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import axios from 'axios'

import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const Skill = () => {

    const [skillList,setSkillList] = useState([{
        name:'',
        rating:0
}]);

const [loading,setLoading] = useState();
const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
const params = useParams()


const handleChange = (index,name,value)=>{

    const newEntries = skillList.slice();
    newEntries[index][name] = value;
    setSkillList(newEntries);

}

const AddNewSkill = ()=>{

  setSkillList([...skillList,{
    name:'',
    rating:''
  }])
}

const RemoveSkill = ()=>{

setSkillList(skillList=>skillList.slice(0,-1));

}

const onSave =async  ()=>{

    setLoading(true);
    let resumeId = params.resumeId;
    if(skillList){

        let response = await axios.put(`http://localhost:3000/storeSkills/${resumeId}`,skillList);
        if(response.status==200){

            setLoading(false);
            console.log(response.data);
            toast("Details Updated !")
        }
        else{
            setLoading(false);
            toast("Internal server error")
        }
    }





}

useEffect(()=>{

    setResumeInfo({
        ...resumeInfo,
        skills:skillList
    })

},[skillList])

  useEffect(() => {
        if (resumeInfo?.skills && resumeInfo.skills.length > 0) {
            setSkillList([...resumeInfo?.skills]); // Spread to avoid direct mutation
        }
    }, []);
    


  return (
    
          <div className='p-5 shadow-xl rounded-xl border-t-primary border-t-4 mt-6'>
        <h2 className='font-bold text-lg'>Skills</h2>
        <p>Add Your top professional skills</p>

        <div>
            {skillList.map((item,index)=>(

                <div key={index} className='flex justify-between border rouded-xl p-3 mb-2'>

                <div>
                    <label className='text-xs'>Name</label>
                    <Input defaultValue={item?.name} className='w-full rounded-[5px] shadow-md border-slate-400 hover:border-blue-500 cursor-pointer hover:border-2' onChange={(e)=>handleChange(index,'name',e.target.value)}/>

                </div>
                <Rating style={{ maxWidth: 120 }} value={Number(item?.rating)} onChange={(v)=>handleChange(index,'rating',v)} />
                </div>
            ))}
        </div>

        <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button onClick={AddNewSkill}  className='text-primary' variant="outline">+Add More Skill</Button>
            <Button onClick={RemoveSkill}  className='text-primary' variant="outline">-Remove</Button>

            </div>

            <Button
              disabled={loading} onClick={()=>onSave()}
               type="submit" className='text-white rounded-xl w-20'>
                {loading?<LoaderCircle  className='animate-spin'/>:"Save"}
               </Button>
        </div>  
        </div>

   
  )
}

export default Skill