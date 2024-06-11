const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({ 
    token: { type: String, required : true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
}, { timestamps: true });



const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;