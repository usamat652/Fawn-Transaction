import mongoose from 'mongoose'

const accountSchema = new mongoose.Schema({
    user: String,
    balance: Number,
  });
  const accountModel = mongoose.model('Account', accountSchema);

  export default accountModel;