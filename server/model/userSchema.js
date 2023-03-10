import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        min: 5,
        max: 20
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        min: 5,
        max: 20
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    }
});

//genSalt(), hash() return a promise therefore await needs to be written before it
//because of which function must be async 
userSchema.pre('save',async function(){
    let salt = await bcrypt.genSalt();
    let hashedString = await bcrypt.hash(this.password, salt);
    this.password = hashedString
})

const user = mongoose.model('user', userSchema);

export default user;