const express = require('express')
const app = express();
const cors = require('cors')
const userModel = require('./models/user')
const experienceModel = require('./models/experienceModel');
const educationModel = require('./models/educationModel');
const skillsModel = require('./models/skillsModel')

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.json({msg:"From from backend and the backend is running"})
})

app.post('/store',async (req,res)=>{
     const {resumeId,title,userEmail,userName,themecolor} = req.body;

     let user = await userModel.create({
        resumeId,
        title,
        userEmail,
        userName,
        themecolor
     })

    res.json({user})
})

app.post('/getResume',async (req,res)=>{
   const {userName} = req.body;

   let user = await userModel.find({userName});

    res.json(user)

})

app.put('/:resumeId',async (req,res)=>{

    console.log(req.body);
    const newData = req.body;

    const resumeId = req.params.resumeId;
    const doc = await userModel.findOneAndUpdate(
        { resumeId },  // Find document where `_id` matches `resumeId`
        { $set: newData },   // Add new fields or update existing ones
        { new: true, upsert: true, runValidators: true } // Return updated document
    );
    if(!doc){
        console.log("error storing the data")
    }
    res.json({doc})
})

app.put('/storeSummary/:id',async (req,res)=>{

   
   let resumeId = req.params.id;
   const data = req.body.summary;
 let doc = await userModel.findOneAndUpdate(
    {resumeId},
    {$set:{summary:data}},
    { new: true, runValidators: true }
 )
 
    res.json({doc})
})




app.put('/storeExperience/:id',async (req,res)=>{

const arr = req.body;
const resumeId = req.params.id;
console.log(arr);

let doc = await experienceModel.findOneAndUpdate(

    {resumeId},
    {experience:arr},
    {new:true,upsert:true}
)




    res.json({msg:"experience stored successfully"})
})







app.put('/storeEducation/:id',async (req,res)=>{

    const arr = req.body;
    const resumeId = req.params.id;
    
    let user = null;

    let doc = await educationModel.findOneAndUpdate(

        {resumeId},
        {education:arr},
        {new:true,upsert:true}
    )
    
        res.json({msg:"eudcation stored successfully"})
    })



    app.put('/storeSkills/:id',async (req,res)=>{

        const arr = req.body;
        const resumeId = req.params.id;
        console.log(arr)
    
        let user = null;

        let doc = await skillsModel.findOneAndUpdate(

            {resumeId},
            {skills:arr},
            {new:true,upsert:true}
        )
        console.log(doc)
        
            res.json({msg:"skills stored successfully"})
        })

app.get('/getAllInfo/:id',async (req,res)=>{

    const resumeId = req.params.id;

    let info1 = await userModel.find({resumeId});

    let info2 = await experienceModel.find({resumeId})

    let info3 = await educationModel.find({resumeId})

    let info4 = await skillsModel.find({resumeId})

    // console.log("users",info1)
    // console.log("##########################")
    // console.log("experience",info2);
    // console.log("##########################")
    // console.log("education",info3);
    // console.log("##########################")
    // console.log("skills",info4);

    let response = {
         title:info1[0]?.title,
         resumeId:info1[0]?.resumeId,
         userEmail:info1[0]?.email,
         userName:info1[0]?.userName,
         address:info1[0]?.address,
         email:info1[0]?.email,
         themecolor:info1[0]?.themecolor,
         firstname:info1[0]?.firstname,
         lastname:info1[0]?.lastname,
         jobtitle:info1[0]?.jobtitle,
         phone:info1[0]?.phone,
         summary:info1[0]?.summary,
         experience:info2[0]?.experience,
         education:info3[0]?.education,
         skills:info4[0]?.skills
    }
  
    
if(info1[0]?.firstname){
   

    res.status(200).json(response)

}
else{
    res.status(400).json({msg:"this is new resume enocountered"})
}
    


})
    
app.delete('/deleteResume/:id',async (req,res)=>{

    const resumeId = req.params.id;

    try{

    

    await userModel.deleteMany({resumeId})
    await experienceModel.deleteMany({resumeId})
    await educationModel.deleteMany({resumeId})
    await skillsModel.deleteMany({resumeId})

    res.json({msg:"resume deleted"})
    
    }

catch(e){

    res.json({msg:"error deleting the resume"})

}

})

app.put(`/updateTheme/:id`,async (req,res)=>{

    const resumeId = req.params.id;
    console.log(resumeId)
    const {color} = req.body;

    let result = await userModel.updateOne({resumeId},{
        $set:{themecolor:color}
    })
    const r = result.modifiedCount;
    res.json({modifiedCount:r})
})

app.listen(3000,()=>{

    console.log("server is running at http://localhost:3000")
})