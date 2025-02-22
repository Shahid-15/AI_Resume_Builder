const mongoose = require('mongoose')

let schema = mongoose.Schema({

   name:String,
   rating:String

},{_id:false})

const newSchema = mongoose.Schema({
  
   resumeId:String,
   skills:[schema]
})


const skillsModel = mongoose.model('skillsModel',newSchema);

module.exports = skillsModel;