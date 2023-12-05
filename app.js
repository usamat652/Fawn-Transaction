import fawn from 'fawn';
import accountModel from "./model/fawnModel.js";
import mongoose from 'mongoose';
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/fawn_npm', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB Connected");
  })
  .catch(() => {
    console.log("Error occur while Connecting");

  })

// Initialize Fawn
fawn.init(mongoose);
//perform transaction
async function performTransaction(fromUser, toUser, amount) {
  try {
    // Start the Fawn task
    await fawn.Task()
      // Update sender  and receiver balance
      .update('accounts', { user: fromUser }, { $inc: { balance: -amount } })
      .update('accounts', { user: toUser }, { $inc: { balance: amount } })
      .run();
    console.log('Transaction successful');
  } catch (error) {
    console.error(`Transaction failed: ${error}`);
  }
}
async function main() {
  try {
    await accountModel.create([
      { user: 'Usama', balance: 500 },
      { user: 'Sajawal', balance: 500 }
    ])
    const initialAccounts = await accountModel.find();
    console.log('Initial Account Balances:');
    initialAccounts.forEach(account => {
      console.log(`${account.user}: ${account.balance}`);
    });
    // Perform a transaction
    await performTransaction('Usama', 'Sajawal', 50);
    const updatedAccounts = await accountModel.find();
    console.log('Balance after Transaction:');
    updatedAccounts.forEach(account => {
      console.log(`${account.user}: ${account.balance}`);
    });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}
main();