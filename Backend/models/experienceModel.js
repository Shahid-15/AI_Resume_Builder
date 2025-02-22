const mongoose = require('mongoose')

let schema = mongoose.Schema({

    title: String,
    companyName: String,
    city: String,
    state: String,
    startDate: String,
    endDate: String,
    workSummary:String

},{_id:false})

const newSchema = mongoose.Schema({
    resumeId:String,
    experience:[schema]
},{ timestamps:true})


const experienceModel = mongoose.model('experienceList',newSchema);

module.exports = experienceModel;