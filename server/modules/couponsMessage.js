import mongoose from 'mongoose';


const couponSchema = mongoose.Schema({
    id: String,
    name: String,
    createdBy:String,
    updatedBy:String,
    code: String,
    percentage: Number,
    startDate : String,
    endDate : String
    
})


const couponsMessage = mongoose.model('CouponsMessage',couponSchema)

export default couponsMessage