const User = require('../models/userModel');
const base = require('./baseController');
const Comment = require('../models/commentModel');

//var mongoosett=require('mongoose');

exports.deleteMe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            active: false
        });

        res.status(204).json({
            status: 'success',
            data: null
        });

    } catch (error) {
        next(error);
    }
};
exports.createComment = async (req, res, next) => {
    try {
        const comment = await Comment.create({

            courseId: req.body.courseId,
            userId: req.body.userId,
            comment: req.body.comment,
            like: req.body.like,
            edited: req.body.edited,
        });

        res.status(204).json({
            status: 'success',
            data: {
                comment
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.updateProfileImage = async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    
    console.log("upload11 url:->" + req.file);
    alert(req.toSource())
    try {
        
        //var userId = mongoosett.Types.ObjectId(req.id);

        await User.findById(req.id, {
            avatarURL: url + '/public/upload' + req.file.filename
        });

        res.status(204).json({
            status: 'success',
            data: null
        });

    } catch (error) {
        next(error);
    }
};
//-----------------

exports.getCoachList = function (req, res, next) {

    var perPage = 9
    var page = req.params.page || 1

    try {
        User
            .find({role:'teacher'})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec(function (err, coachs) {
                User.estimatedDocumentCount().exec(function (err, count) {
                    console.log("count coach->" + count);
                    if (err || coachs.length === 0) {
                        res.json({ success: false, error_code: ' err 400' });
                    }
                    else {
                        function sortCouch(a, b) {
                            if (a.name < b.name)
                                return -1;
                            if (a.name > b.name)
                                return 1;
                            return 0;
                        }

                        coachs.sort(sortCouch);
                        console.log("count coach->" + coachs);

                        // res.json({ success: true, message:"successfully" , coachs:coachs,current: page, pages: Math.ceil(count / perPage)});


                        res.json({
                            status: 'success',
                            message: "successfully",
                            data: coachs,
                            current: page,
                            pages: Math.ceil(count / perPage)
                        }).status(204);
                    }
                })
            })

    } catch (error) {
        next(error);
    }
};


exports.getAllUsers = base.getAll(User);
exports.getUser = base.getOne(User);

// Don't update password on this 
exports.updateUser = base.updateOne(User);
exports.deleteUser = base.deleteOne(User);