const mongoose= require('mongoose')

const projectSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
            description:String       
    },
    {
        timestamps:{
            createdAt:'created_at',
            updatedAt:false
        }
    }   
);

module.exports = mongoose.model('Project',projectSchema)