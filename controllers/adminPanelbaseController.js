const Category = require('../models/categoryModel');
const Course = require('../models/courseModel');
const Comment = require('../models/commentModel');
const Plan = require('../models/planModel');
const User = require('../models/userModel');

const base = require('./baseController');


exports.getPlayListCategory = function(req, res, next) {

    var perPage = 2
    var page = req.params.page || 1

    Play_list_cat
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, catList) {
            Play_list_cat.count().exec(function(err, count) {
                
                if (err || catList.length === 0 ) {
                    res.json({ success: false, error_code:' err 400' });
               }
               else {
                   function sortCategory(a,b) {
                     if (a.name < b.name)
                       return -1;
                     if (a.name > b.name)
                       return 1;
                     return 0;
                   }
                   catList.sort(sortCategory);
                   res.json({ success: true, message:"successfully" , catList:catList,current: page, pages: Math.ceil(count / perPage)});
               }
            })
        })
    
};

exports.createNewCoach = async (req, res, next) => {
     
     try {
         const user = await User.create({
             
             name: req.body.name,
             email: req.body.email,
             address: req.body.address,
             about: req.body.about,
             facebook: req.body.facebook,
             telegram: req.body.telegram,
             instagram: req.body.instagram,
             role: req.body.role,
             city:req.body.city
         });
 
         res.status(201).json({
             status: 'success',
             data: {
                 user
             }
         });
 
     } catch (err) {
         next(err);
     }
 };
 
exports.createPlan = async (req, res, next) => {
    try {
        const plan = await Plan.create({
            name: req.body.name,
            uniqueTitle: req.body.uniqueTitle,
            type: req.body.type,
            price: req.body.price,
            edited: req.body.edited,
            order: req.body.order,
            popular: req.body.popular,
        });

        res.status(204).json({
            status: 'success',
            data: {
                plan
            }
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

exports.createCategory = async (req, res, next) => {
    try {
        const category = await Category.create({

            title: req.body.title,
            uniqueTitle: req.body.uniqueTitle,
            pictureURL: req.body.pictureURL,
            iconURL: req.body.iconURL,
            color: req.body.color,
            description: req.body.description,
            metaKeyWord: req.body.metaKeyWord,
            MetaDescription: req.body.description,

        });

        res.status(204).json({
            status: 'success',
            data: {
                category
            }
        });


    } catch (error) {
        next(error);
    }
};

exports.createCourse = async (req, res, next) => {
    try {
        const course = await Course.create({

            name: req.body.name,
            uniqueTitle: req.body.uniqueTitle,
            coachId: req.body.coachId,
            categoryId: req.body.categoryId,
            level: req.body.level,
            perviewAudioFileURL: req.body.perviewAudioFileURL,
            AudioFileURL: req.body.AudioFileURL,
            PerviewVideoFileURL: req.body.PerviewVideoFileURL,
            VideoFileURL: req.body.VideoFileURL,
            time: req.body.time,
            calories: req.body.calories,
            target: req.body.target,
            sweat: req.body.sweat,
            equipmentsList: req.body.equipmentsList,
            brief: req.body.brief,
            description: req.body.description,
            equipments: req.body.equipments,
            free: req.body.free,
            active: req.body.active,

        });

        res.status(204).json({
            status: 'success',
            data: {
                course
            }
        });


    } catch (error) {
        next(error);
    }
};

exports.getAllPlan = base.getAll(Plan);
exports.getOnePlan = base.getOne(Plan);

exports.getAllComment = base.getAll(Comment);
exports.getOneComment = base.getOne(Comment);

exports.getAllCourse = base.getAll(Course);
exports.getOneCourse = base.getOne(Course);

exports.getAllCategorys = base.getAll(Category);
exports.getOneCategory = base.getOne(Category);

// // Don't update password on this 
// exports.updateCategory = base.updateOne(Category);
// exports.deleteCategory = base.deleteOne(Category);