const mongoose = require('mongoose')

let schema = mongoose.Schema({
  
    degree:String,
    endDate:String,
    institution:String,
    major:String,
    startDate:String,
    workSummary:String
},{_id:false})


const newSchema = mongoose.Schema({
    resumeId:String,
    education:[schema]

})

const educationModel = mongoose.model('educationList',newSchema);

module.exports = educationModel;