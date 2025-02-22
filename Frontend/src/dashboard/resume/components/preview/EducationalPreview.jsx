import React from 'react'

const EducationalPreview = ({resumeInfo}) => {
  return (

    <div className='my-6'>
    <h2 className='text-center font-bold text-sm mb-2'
    style={{color:resumeInfo?.themecolor}}>Education</h2>
       
       <hr className='border' style={{borderColor:resumeInfo?.themecolor}}/>

       {resumeInfo?.education.map((education,index)=>(

        <div key={index} className='my-5'>

            <h2 className='text-sm font-bold'
            style={{color:resumeInfo?.themecolor}}
            >{education?.institution}</h2>
            <h2 className='text-xs flex justify-between'>{education?.degree} in {education?.major}

                <span>{education?.startDate} - {education?.endDate}</span>
            </h2>
            <p className='text-xs my-2 font-semibold'>
                {education?.workSummary}
            </p>

        </div>
       ))}

    

       </div>

  )
}

export default EducationalPreview