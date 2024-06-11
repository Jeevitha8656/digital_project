const mongoose = require('mongoose');   
const env=require('dotenv').config();   
// mongoose.connect(process.env.MONGO_URI
// ).then(() => {
//     console.log('Database connected');
// }).catch((err) => {
//     console.log('Error connecting to database', err);
// });
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    }
},{timestamps:true});     
const User = mongoose.model('User', UserSchema);    
module.exports = User;