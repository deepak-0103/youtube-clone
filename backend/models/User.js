import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

username:String,

email:{
type:String,
unique:true
},

password:String,

avatar:{
type:String,
default:"https://i.pravatar.cc/150"
},

channels:[String]

});

export default mongoose.model("User",userSchema);