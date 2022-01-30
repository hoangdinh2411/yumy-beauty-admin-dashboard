import mongoose from 'mongoose';


const serviceSchema = mongoose.Schema({
})


const serviceMessage = mongoose.model('ServiceMessage',serviceSchema)

export default serviceMessage