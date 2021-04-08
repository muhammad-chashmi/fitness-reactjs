const express = require('express');
const router = express.Router();
//const userController = require('../controllers/userController');  
const adminPanelbaseController = require('../controllers/adminPanelbaseController');  
const authController = require('./../controllers/authController');

// Protect all routes after this middleware
router.use(authController.protect);

router.route('/allCategory').get(adminPanelbaseController.getAllCategorys);
router.route('/allCourse').get(adminPanelbaseController.getAllCourse);
router.route('/allComment').get(adminPanelbaseController.getAllComment);

// Only admin have permission to access for the below APIs 
router.use(authController.restrictTo('admin'));
router.route('/createCategory').post(adminPanelbaseController.createCategory);
router.route('/createNewCoach').post(adminPanelbaseController.createNewCoach);
router.route('/getOneCategory/:id').get(adminPanelbaseController.getOneCategory);
router.route('/getOneCourse/:id').get(adminPanelbaseController.getOneCourse);
router.route('/getOneComment/:id').get(adminPanelbaseController.getOneComment);
router.route('/getOnePlan/:id').get(adminPanelbaseController.getOnePlan);
router.route('/allPlan').get(adminPanelbaseController.getAllPlan);

// router
//     .route('/:id')
//     .get(userController.getUser)
//     .patch(userController.updateUser)
//     .delete(userController.deleteUser);

module.exports = router;