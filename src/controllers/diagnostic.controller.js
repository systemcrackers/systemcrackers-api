const Diagnostic = require('../models/diagnostic.schema');
const User = require('../models/user.schema');
const cloudinary = require('../configs/cloudinary.config');
const pdf = require('pdfkit');
const fs = require('fs');
const { sendEmailAttachment } = require('./../utilities/utils');

const diagnosticTest = async (req, res) => {
    try {
        // if (req.file) {
            // const imageUrl = await cloudinary.uploader.upload(req.file.path);

            const diagnosticTest = new Diagnostic({
                parentId: req.user.id,
                // handwritingImage: imageUrl,
                dyslexiaResult: req.body.dyslexiaResult,
                autismResult: req.body.autismResult,
                q1: req.body.q1,
                a1: req.body.a1,
                q2: req.body.q2,
                a2: req.body.a2,
                q3: req.body.q3,
                a3: req.body.a3,
                q4: req.body.q4,
                a4: req.body.a4,
                q5: req.body.q5,
                a5: req.body.a5,
                q6: req.body.q6,
                a6: req.body.a6,
                q7: req.body.q7,
                a7: req.body.a7,
                q8: req.body.q8,
                a8: req.body.a8,
                q9: req.body.q9,
                a9: req.body.a9,
                q10: req.body.q10,
                a10: req.body.a10
            });
            
            const user = await User.findById(req.user.id);
            const child = await User.findOne({ parentId: user._id });
            
            const doc = new pdf();
            const path = 'public/uploads/report.pdf';
            doc.pipe(fs.createWriteStream(path));
            doc.fontSize(27).text('Report', 100, 100, {  align: 'justify' });
            doc.fontSize(12).text(`Guardian/Parent: ${user.name}                                    Email: ${user.email}`);
            doc.fontSize(12).text(`Name of child: ${child.name}                                     Date of Birth: ${child.dob}`);
            doc.fontSize(12).text(`-------------------------------------------------------------------------------------------------------`);
            doc.fontSize(12).text('');
            doc.fontSize(13).text(`Dyslexia: ${diagnosticTest.dyslexiaResult}`);
            doc.fontSize(13).text(`Autism: ${diagnosticTest.autismResult}`);
            // doc.image(req.file.path, { fit: [200, 200], align: 'center', valign: 'center' });
            doc.end();

            const reportUrl = await cloudinary.uploader.upload(path);
            diagnosticTest.report = reportUrl.url;
            await diagnosticTest.save();

            await sendEmailAttachment(req, req.user, path);
            
            // fs.unlinkSync(req.file.path);
            fs.unlinkSync(path);

            res.status(201).json({
                message: 'Diagnostic test completed successfully',
                data: {
                    diagnosticTest
                }
            });
        // } else {
        //     res.status(400).json({
        //         message: 'Please upload file'
        //     });
        // }        
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const diagnosticReports = async(req, res) => {
    try {
        const reports = await Diagnostic.find({ parentId: req.user.id });

        if (!(reports.len == 0)) {
            res.status(200).json({
                message: 'Reports found',
                data: {
                    reports
                }
            });
        } else {
            res.status(404).json({
                message: 'Reports not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    diagnosticTest,
    diagnosticReports
};
