import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview';
import SummaryPreview from './preview/SummaryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationalPreview from './preview/EducationalPreview';
import SkillsPreview from './preview/SkillsPreview';

const PreviewSection = () => {

  const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);

  return (
    <div className='shadow-2xl h-full p-8 border-t-[20px]'
    style={{
      borderColor:resumeInfo?.themecolor
    }}>
      {/* Personal Details */}
      <PersonalDetailPreview resumeInfo={resumeInfo}/>


      {/* Summary */}
      <SummaryPreview resumeInfo={resumeInfo}/>

      {/* Professional experience */}
      <ExperiencePreview resumeInfo={resumeInfo}/>

      {/* education details */}
      <EducationalPreview resumeInfo={resumeInfo}/>


      {/* skills */}
      <SkillsPreview resumeInfo={resumeInfo}/>

    </div>
  )
}

export default PreviewSection