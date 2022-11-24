const User = require('./../models/user.schema');
const Diagnostic = require('./../models/diagnostic.schema');
const axios = require('axios');
const fs = require('fs');

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            res.status(404).json({
                message: 'User not found'
            });
        } else {
            res.status(200).json({
                message: 'User found',
                data: {
                    user
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const pickExpert = async (req, res) => {
    try {
        const expert = await User.findById(req.body.expertId);

        if (!expert) {
            res.status(404).json({
                message: 'Expert not found'
            });
        } else {
            const user = await User.findById(req.user.id);

            if (!user) {
                res.status(404).json({
                    message: 'User not found'
                });
            } else {
                const diagnosticTest = await Diagnostic.findById(req.body.diagnosticTestId);

                if (!diagnosticTest) {
                    res.status(404).json({
                        message: 'User not found'
                    });
                } else {
                    diagnosticTest.expert = expert._id;
                    await diagnosticTest.save();

                    const path = 'public/uploads/report.pdf';
                    const writer = fs.createWriteStream(path);
                    const result = await axios.get(diagnosticTest.report, { responseType: 'stream' });
                    result.data.pipe(writer);

                    await sendEmailAttachment(req, expert, path);

                    fs.unlinkSync(path);

                    res.status(200).json({
                        message: 'Expert assigned',
                        data: {
                            user,
                            diagnosticTest,
                            expert
                        }
                    });
                }
            }
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getUser,
    pickExpert
};