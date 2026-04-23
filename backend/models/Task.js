const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        project_id:{
            type :mongoose.Schema.Types.ObjectId,
            ref:"Project",
            required:true
        },
        title:{
           type:String,
           required:true
        },
        description:String,
        status:{
            type:String,
            enum:['todo', 'in-progress', 'done'],
            default: 'todo'
        },
        priority: {
         type: String,
         enum: ['low', 'medium', 'high'],
         required: true
    },
        due_date: Date
},
     { timestamps: { createdAt: 'created_at', updatedAt: false } }
)
module.exports = mongoose.model('Task', taskSchema);