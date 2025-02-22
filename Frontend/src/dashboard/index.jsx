import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import axios from 'axios';
import ResumeCard from '@/components/custom/ResumeCard';

function Dashboard() {

  const {user,isSignedIn} = useUser();
  const [userList,setUserList] = useState([]);
  

  const getResumeDetails = async ()=>{
      
     let userName = user?.fullName;
    

     let response = await  axios.post(`http://localhost:3000/getResume`,{userName});
     setUserList(response.data);

  }

  useEffect(()=>{

  getResumeDetails();
  },[user,isSignedIn])

  useEffect(()=>{
   console.log(userList)

  },[userList])

  return (
    <div className='p-10 md:px-20 lg:px-32'>
        <h2 className='font-bold text-2xl'>My Resume</h2>
        <p>Start Creating AI resume for your next job role</p>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5'> 
          <AddResume/>
          {userList&&userList.map((resume,idx)=>(

            <ResumeCard refreshData={getResumeDetails}   resume={resume} key={idx}/>
          ))}

        </div>
      
    </div>
  )
}

export default Dashboard
