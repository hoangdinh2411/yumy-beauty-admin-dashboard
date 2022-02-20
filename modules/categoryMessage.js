import mongoose from 'mongoose';


const categorySchema = mongoose.Schema({
    name: String,
    createdBy:String,
    updatedBy:String,
    selectedFile: String,
    createdAt : {
        type: Date,
        default: new Date()
    },
    updatedAt : {
        type: Date,
        default: new Date()
    },
    
})


const categoryMessage = mongoose.model('CategoryMessage',categorySchema)

export default categoryMessage