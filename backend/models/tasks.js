const mongoose=require('mongoose');

let taskSchema=new mongoose.Schema({
    username:{
        type:String,
    },
    title:{
        type:String,
    },
    completed:{
        type:Boolean,
    },
    createdAt:{
        type:String,
    }
});

module.exports = mongoose.model('Task', taskSchema);
