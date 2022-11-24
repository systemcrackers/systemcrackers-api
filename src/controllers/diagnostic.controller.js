const Diagnostic = require('../models/diagnostic.schema');
const User = require('../models/user.schema');
const cloudinary = require('../configs/cloudinary.config');
const pdf = require('pdfkit');
const fs = require('fs');
const { sendEmailAttachment } = require('./../utilities/utils');

const diagnosticTestDraft = async (req, res) => {
    try {
        if (req.file) {
            const imageUrl = await cloudinary.uploader.upload(req.file.path);

            const diagnosticTest = new Diagnostic({
                parentId: req.user.id,
                handwritingImage: imageUrl.url,
                dyslexiaResult: req.body.pred
            });
            console.log(diagnosticTest);
            await diagnosticTest.save();

            res.status(201).json({
                message: 'Draft saved'
            });
        } else {
            res.status(400).json({
                message: 'File not uploaded'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const diagnosticTest = async (req, res) => {
    try {
        // const diagnosticTest = 
        //     diagnosticTest.dyslexiaResult = req.body.dyslexiaResult;
        //     diagnosticTest.autismResult = req.body.autismResult;
        //     diagnosticTest.q1 = 'Does your child look at you when you call his/her name?';
        //     diagnosticTest.a1 = req.body.a1;
        //     diagnosticTest.q2 = 'How easy is it for you to get eye contact with your child?';
        //     diagnosticTest.a2 = req.body.a2;
        //     diagnosticTest.q3 = 'Does your child point to indicate that s/he wants something? (e.g. a toy is out of reach)';
        //     diagnosticTest.a3 = req.body.a3;
        //     diagnosticTest.q4 = 'Does your child point to share interest with you? (e.g. pointing at an interesting sight)';
        //     diagnosticTest.a4 = req.body.a4;
        //     diagnosticTest.q5 = 'Does your child pretend? (e.g. care for dolls, talk on a toy phone)';
        //     diagnosticTest.a5 = req.body.a5;
        //     diagnosticTest.q6 = 'Does your child follow where you\'re looking?';
        //     diagnosticTest.a6 = req.body.a6;
        //     diagnosticTest.q7 = 'If you or someone else in the family is visibly upset, does your child show signs of wanting to comfort them? (e.g. stroking hair, hugging them)';
        //     diagnosticTest.a7 = req.body.a7;
        //     diagnosticTest.q8 = 'Would you describe your child\'s first word as:';
        //     diagnosticTest.a8 = req.body.a8;
        //     diagnosticTest.q9 = 'Does your child you simple gestures? (e.g. wave goodbye)';
        //     diagnosticTest.a9 = req.body.a9;
        //     diagnosticTest.q10 = 'Does your child stare at nothing with no apperent purpose?';
        //     diagnosticTest.a10 = req.body.a10;
        //     diagnosticTest.date = new Date();
            
        //     const user = await User.findById(req.user.id);
        //     const child = await User.findOne({ parentId: user._id });
            
        //     const doc = new pdf();
        //     const path = 'public/uploads/report.pdf';
        //     doc.pipe(fs.createWriteStream(path));
        //     doc.fontSize(27).text('Report', 100, 100, {  align: 'justify' });
        //     doc.fontSize(12).text(`Guardian/Parent: ${user.name}                                    Email: ${user.email}`);
        //     doc.fontSize(12).text(`Name of child: ${child.name}                                     Date of Birth: ${child.dob}`);
        //     doc.fontSize(12).text(`-------------------------------------------------------------------------------------------------------`);
        //     doc.fontSize(12).text('');
        //     doc.fontSize(13).text(`Dyslexia: ${diagnosticTest.dyslexiaResult}`);
        //     doc.fontSize(13).text(`Autism: ${diagnosticTest.autismResult}`);
        //     // doc.image(req.file.path, { fit: [200, 200], align: 'center', valign: 'center' });
        //     doc.end();

        //     const reportUrl = await cloudinary.uploader.upload(path);
        //     diagnosticTest.report = reportUrl.url;
        //     await diagnosticTest.save();

        //     await sendEmailAttachment(req, req.user, path);
            
        //     // fs.unlinkSync(req.file.path);
        //     fs.unlinkSync(path);

        //     res.status(201).json({
        //         message: 'Diagnostic test completed successfully',
        //         data: {
        //             diagnosticTest
        //         }
        //     });
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
    diagnosticTestDraft,
    diagnosticTest,
    diagnosticReports
};
