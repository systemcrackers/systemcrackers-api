const mongoose = require('mongoose');

// Defining auth schema
const authSchema = new mongoose.Schema(
    {
        user: {
            type: {
                id: {
                    type: String
                },
                email: {
                    type: String
                },
                role: {
                    type: String,
                    enum: ['ADMIN', 'USER']
                },
                loginProvider: {
                    type: String,
                    enum: ['CLOUD BIND', 'GOOGLE']
                }
            }
        },
        token: {
            type: String
        },
        tokenType: {
            type: String,
            enum: ['BEARER', 'EMAIL VERIFICATION CODE']
        },
        lastAccess: {
            type: Date
        },
        clientIPAddress: {
            type: String,
            required: false
        },
        userAgent: {
            type: String,
            required: false
        },
        isExpired: {
            type: Boolean,
            default: false
        },
        lastAccess: {
            type: Date
        }
    },
    { timestamps: true }
);

const Auth = mongoose.model('auth', authSchema);

module.exports = Auth;