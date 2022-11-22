const mongoose = require('mongoose');

// Defining user schema
const childSchema = new mongoose.Schema(
    {
        parentId: {
            type: String
        },
        name: {
            type: String,
            trim: true
        },
        sex: {
            type: String,
            enum: ['MALE', 'FEMALE']
        },
        dob: {
            type: String
        },
        country: {
            type: String
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