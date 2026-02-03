import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: { type: String, required: true }
});

export default mongoose.model('Company', companySchema);