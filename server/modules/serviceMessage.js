import mongoose from 'mongoose';


const serviceSchema = mongoose.Schema({
    name: String,
    description: String,
    createdBy: String,
    category: String,
    price: Number,
    timeTake: String,
    selectedFile : String,
    totalOrder: {
        type:Number,
        default: 0
    },
    totalIncome: {
        type:Number,
        default: 0
    },
    staffs: [String],
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    updatedBy: String,
})


const serviceMessage = mongoose.model('ServiceMessage',serviceSchema)

export default serviceMessage