import React from 'react'

const SummaryPreview = ({resumeInfo}) => {
  return (
    <div>
        <p className='text-xs font-semibold '>
            {resumeInfo?.summary}

        </p>

    </div>
  )
}

export default SummaryPreview