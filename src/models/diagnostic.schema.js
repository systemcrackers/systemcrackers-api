const mongoose = require('mongoose');

// Defining user schema
const diagnosticSchema = new mongoose.Schema(
    {
        parentId: {
            type: String
        },
        handwritingImage: {
            type: String
        },
        q1: {
            type: String
        },
        a1: {
            type: Number
        },
        q2: {
            type: String
        },
        a2: {
            type: Number
        },
        q3: {
            type: String
        },
        a3: {
            type: Number
        },
        q4: {
            type: String
        },
        a4: {
            type: Number
        },
        q5: {
            type: String
        },
        a5: {
            type: Number
        },
        q6: {
            type: String
        },
        a6: {
            type: Number
        },
        q7: {
            type: String
        },
        a7: {
            type: Number
        },
        q8: {
            type: String
        },
        a8: {
            type: Number
        },
        q9: {
            type: String
        },
        a9: {
            type: Number
        },
        q10: {
            type: String
        },
        a10: {
            type: Number
        },
        report: {
            type: String
        },
        date: {
            type: Date
        }
    }, 
    { timestamps: true }
);

const Diagnostic = mongoose.model('diagnostic', diagnosticSchema);

module.exports = Diagnostic;