import React from 'react'

const ExperiencePreview = ({resumeInfo}) => {
  return (
    <div className='my-6'>
      <h2 className='text-center font-bold text-sm mb-2'
      style={{color:resumeInfo?.themecolor}}>Professional Experience</h2>
         
         <hr className='border' style={{borderColor:resumeInfo?.themecolor}}/>

         {resumeInfo?.experience.map((experience,index)=>(

          <div className='my-5' key={index}>
                 <h2  style={{color:resumeInfo?.themecolor}} className='text-sm font-bold'>{experience?.title}</h2>
                 <h2 className=' font-medium text-xs flex justify-between'>{experience?.companyName}
                  ,{experience?.city}
                  ,{experience?.state}
                  <span className='font-semibold'>{experience?.startDate} To {experience.currentlyWorking?"Present":experience?.endDate}</span>
                  </h2>
                  {/* <p className='text-xs my-2 font-semibold'>
                    {experience?.workSummary}
                  </p> */}
                  <div dangerouslySetInnerHTML={{__html:experience?.workSummary}}/>

                  
          </div>
         ))}
    </div>
  )
}

export default ExperiencePreview