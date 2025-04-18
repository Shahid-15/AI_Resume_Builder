import React from 'react'

const PersonalDetailPreview = ({resumeInfo}) => {
  return (
    <div>
        <h2 className='font-bold text-xl text-center'
        style={{
            color:resumeInfo?.themecolor
        }}>
            {resumeInfo?.firstname} {resumeInfo?.lastname}</h2>
        <h2 className='text-center text-sm font-medium'>{resumeInfo?.jobtitle}</h2>
        <h2 className='text-center font-normal text-xs'
         style={{
            color:resumeInfo?.themecolor
        }}
        >{resumeInfo?.address}</h2>
        <div className='flex justify-between'>
            <h2 className='font-normal text-xs'
             style={{
                color:resumeInfo?.themecolor
            }}
            >{resumeInfo?.phone}</h2>
            <h2 className='font-normal text-xs'
             style={{
                color:resumeInfo?.themecolor
            }}
            >{resumeInfo?.email}</h2>
        </div>
        <hr className='border-[1.5px] my-2'
        style={{borderColor:resumeInfo?.themecolor}}/>
    </div>
  )
}

export default PersonalDetailPreview