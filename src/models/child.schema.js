const mongoose = require('mongoose');

// Defining user schema
const childSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true
        },
        dob: {
            type: Date
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

const Child = mongoose.model('child', childSchema);

module.exports = Child;