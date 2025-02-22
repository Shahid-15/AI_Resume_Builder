import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { AIchatSession } from '@/service/AIModel';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { BtnBold, BtnBulletList, BtnItalic, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg'
import { toast } from 'sonner';

const PROMPT = "position title : {positionTitle},Depends on position title give me 5-7 bullet points for my experience in resume ,give me result in HTML format means single array containing bullets points dont give object just array [bullet points,]"


const RichTextEditor = ({onReachTextEditorChange,index,defaultValue}) => {
    const [value,setValue] = useState(defaultValue);
    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
      setValue(defaultValue); // Update when defaultValue changes
  }, [defaultValue]);
    
    const GenerateSummaryFromAI = async ()=>{
      if(!resumeInfo?.experience[index].title){
        
        toast("Please ADD position title");
        return;
      }
      setLoading(true);
      const prompt = PROMPT.replace('{positionTitle}',resumeInfo?.experience[index].title);

       const result = await AIchatSession.sendMessage(prompt);

       if(result){

         console.log(result.response.text())
         setLoading(false);
         const resp = result.response.text().replace("[","").replace("]","") 
         setValue(resp)
       }
       else{
        setLoading(false);

       }
      

    }
  return (
    <div>
      <div className='flex justify-between items-center my-2 px-2'>
        <label htmlFor="" className='text-xs font-semibold'>Summary</label>
        <Button onClick={GenerateSummaryFromAI} variant="outline" size="sm" className='flex gap-2 text-purple-500  border-primary '>{loading?<LoaderCircle className='animate-spin'/>:<><Brain className='h-4 w-4'/> "Generate From AI"</>}</Button>
      </div>
         <EditorProvider>
         <Editor value={value} onChange={(e)=>{
            setValue(e.target.value)
            onReachTextEditorChange(e);
         }}>

<Toolbar>
          <BtnBold />
          <BtnItalic />

          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList/>
        </Toolbar>



            </Editor>
        
        </EditorProvider>
    </div>
  )
}

export default RichTextEditor