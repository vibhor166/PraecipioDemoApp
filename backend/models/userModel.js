import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

userSchema.pre('save', async function(next) { // 'pre' for before we save
    if(!this.isModified('password')) { //this is referring to the User object created
        next();
    }

    const salt = await bcrypt.genSalt(10); //a key used to hash the password
    this.password = await bcrypt.hash(this.password, salt);
})         


userSchema.methods.matchPassword = async function(enteredPassword) { //adding a method to the userSchema object
    return await bcrypt.compare(enteredPassword, this.password);
}
const User = mongoose.model('User', userSchema);
export default User;