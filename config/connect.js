import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/fawn_npm',{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("DB Connected");
})
.catch(()=>{
    console.log("Error occur while Connecting");

})
export {connection};