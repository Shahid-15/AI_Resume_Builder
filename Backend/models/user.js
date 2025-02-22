const mongoose = require('mongoose')

mongoose.connect(`mongodb://localhost:27017/AI_resume_builder`)


const userSchema = mongoose.Schema({

    title:String,
    resumeId:String,
    userEmail:String,
    userName:String,
    firstname:String,
    lastname:String,
    jobtitle:String,
    address:String,
    phone:String,
    email:String,
    summary:String,
    themecolor:String
})

module.exports = mongoose.model('user',userSchema);

