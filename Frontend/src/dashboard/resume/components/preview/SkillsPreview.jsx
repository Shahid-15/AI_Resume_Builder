import React from 'react'

const SkillsPreview = ({resumeInfo}) => {
  return (
    <div className='my-6'>
    <h2 className='text-center font-bold text-sm mb-2'
    style={{color:resumeInfo?.themecolor}}>Skills</h2>
       
       <hr className='border' style={{borderColor:resumeInfo?.themecolor}}/>

       <div className='grid grid-cols-2 gap-3 mt-4'>
        {resumeInfo?.skills.map((skill,index)=>(

            <div key={index} className='flex items-center justify-around'>
                <h2 className='text-xs font-semibold'>{skill?.name}</h2>

                <div className='h-4 rounded-xl bg-gray-300 w-[120px]'>
                       
                       <div className='h-4 text-center rounded-xl text-[10px]'
                       style={{
                        backgroundColor:resumeInfo?.themecolor,
                        width:skill?.rating*20+'%'
                       }}>{skill?.rating*20+'%'}</div>

                    </div>

            </div>
        ))}
       </div>

    </div>
  )
}

export default SkillsPreview