const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
//const adminPanelbaseController = require('../controllers/adminPanelbaseController');  
const authController = require('./../controllers/authController');
//const appStorag = require('../utils/appStorageHelper');
const  multer = require('multer');
//const uuidv4 = require('uuid/dist/v4');
//import { uuid } from 'uuidv4';


router.post('/login', authController.login);
router.post('/signup', authController.signup);

    const DIR = './public/upload/';

    // function generate(count, k) {
    //     var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890',
    //     var str = '';
    
    //     for(var i = 0; i < count; i++) {
    //         str += _sym[parseInt(Math.random() * (_sym.length))];
    //     }
    //     base.getID(str, function(err, res) {
    //         if(!res.length) {
    //           k(str)                   // use the continuation
    //         } else generate(count, k)  // otherwise, recurse on generate
    //     });
    // }

    // const storage = multer.diskStorage({
    //     destination: (req, file, cb) => {
    //         cb(null, DIR);
    //     },
    //     filename: (req, file, cb) => {
    //         const fileName = file.originalname.toLowerCase().split(' ').join('-');

    //        // generate(10, function(uniqueId){
    //             // have a uniqueId
    //             cb(null, 'SOLOMON' + '-' + fileName)

    //          // })

    //     }
    // });
    
    // var upload = multer({
    //     storage: storage,
    //     fileFilter: (req, file, cb) => {
    //         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    //             cb(null, true);
    //         } else {
    //             cb(null, false);
    //             return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    //         }
    //     }
    // });

    const storage = multer.diskStorage({
        destination: DIR,
        filename(req, file, cb) {
          cb(null, `${new Date()}-${file.originalname}`);
        },
      });
      
      const  upload = multer({
            storage: storage,
            fileFilter: (req, file, cb) => {
                if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                    cb(null, true);
                } else {
                    cb(null, false);
                    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
                }
            }
        });
      //upload = multer({ storage });


// const checkId = function (req, res, next) {
//     if (req.params.id == 1) {
//         const err = new Error('gotted');
//         err.statusCode = 404;

//         return next(err);
//     }

//     return next();
// };

// const responseUser = function (req, res) {
//     return res.status(201).send(req.params.id);
// };

// router.get('/user/:id', checkId, responseUser);

// Protect all routes after this middleware
router.use(authController.protect);

router.delete('/deleteMe', userController.deleteMe);
router.route('/getAllCouch').get(userController.getCoachList);

//const upload = appStorag.myupload();  //createComment
router.route('/createComment').get(userController.createComment);

router.post('/user-profile', upload.single('profileImg'),userController.updateProfileImage)

// Only admin have permission to access for the below APIs 
router.use(authController.restrictTo('admin'));
router.route('/getAllUser').get(userController.getAllUsers);
router.route('/user/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);




module.exports = router;