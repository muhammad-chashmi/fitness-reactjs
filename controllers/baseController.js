const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
var mongoosett=require('mongoose');

exports.deleteOne = Model => async (req, res, next) => {
    try {

        var userId = mongoosett.Types.ObjectId(req.params.id);
        const doc = await Model.findByIdAndDelete(userId);

        if (!doc) {
            return next(new AppError(404, 'fail', 'No document found with that id'), req, res, next);
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        next(error);
    }
};

exports.updateOne = Model => async (req, res, next) => {
    try {
        var userId = mongoosett.Types.ObjectId(req.params.id);

        const doc = await Model.findByIdAndUpdate(userId, req.body, {
            new: true,
            runValidators: true
        });

        if (!doc) {
            return next(new AppError(404, 'fail', 'No document found with that id'), req, res, next);
        }

        res.status(200).json({
            status: 'success',
            data: {
                doc
            }
        });

    } catch (error) {
        next(error);
    }
};

exports.createOne = Model => async (req, res, next) => {
    try {
        const doc = await Model.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                doc
            }
        });

    } catch (error) {
        next(error);
    }
};

exports.getOne = Model => async (req, res, next) => {
    try {

       // var userId = mongoosett.Schema.Types.ObjectId(req.params.id);
        var userId = mongoosett.Types.ObjectId(req.params.id);
        const doc = await Model.findById(userId);

        if (!doc) {
            return next(new AppError(404, 'fail', 'No document found with that id'), req, res, next);
        }

        res.status(200).json({
            status: 'success',
            data: {
                doc
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.getAll = Model => async (req, res, next) => {
    try {
        var perPage = 2

        const features = new APIFeatures(Model.find(), req.query)
            .sort()
            .paginate();

        const doc = await features.query;
        const items = await Model.find();

        res.status(200).json({
            status: 'success',
            results: doc.length,
            pages: Math.ceil(items.length / perPage),
            data: {
                data: doc
            }
        });

    } catch (error) {
        next(error);
    }

};