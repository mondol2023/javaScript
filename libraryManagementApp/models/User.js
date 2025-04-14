const { default: mongoose } = require("mongoose")

const bcrypt= require('bcryptjs');


const userSchema = new mongoose.Schema({
    name: {type: String , required: true},
    email: {type: String , unique: true , required: true},
    password: {type: String , required: true},
    role : {type: String , required: true}
});

userSchema.pre('save', async function(){
    this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model('User', userSchema);