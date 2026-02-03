import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }
});

export default mongoose.model('Customer', customerSchema);