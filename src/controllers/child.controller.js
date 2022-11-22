const Child = require('./../models/child.schema');

const createChild = async (req, res) => {
    try {
        const newChild = new Child({
            parentId: req.user.id,
            name: req.body.name,
            sex: req.body.sex,
            dob: req.body.dob,
            country: req.body.country
        });

        await newChild.save();

        res.status(201).json({
            message: 'Child registered',
            data: {
                child: newChild
            }
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getChild = async (req, res) => {
    try {
        const child = await Child.findOne({ parentId: req.user.id });

        if (!child) {
            res.status(404).json({
                message: 'Child not found'
            });
        } else {
            res.status(200).json({
                message: 'Child found',
                data: {
                    child
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createChild,
    getChild
};