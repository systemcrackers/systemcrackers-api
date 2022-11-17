const mongoose = require('mongoose');

// Defining user schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            match: [/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/, 'Please enter a valid email address']
        },
        password: {
            type: String,
            trim: true
        },
        dob: {
            type: Date
        },
        profilePicture: {
            type: String
        },
        role: {
            type: String,
            enum: ['ADMIN', 'USER']
        },
        loginProvider: {
            type: String,
            enum: ['SYSTEM CRACKERS', 'GOOGLE']
        },
        isActivated: {
            type: Boolean,
            default: false
        },
        isdeleted: {
            type: Boolean,
            default: false
        }
    }, 
    { timestamps: true }
);

// Hashing the password before storing
userSchema.pre('save',async function (next) {
    const user = this;

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;