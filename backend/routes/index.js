var express = require('express');
const { signup ,login, createProject, saveProject,getProjects,getProject,deleteProject, editProject, runCode} = require('../controllers/userController');
const { create } = require('../models/projectModels');
var router = express.Router();
require("dotenv").config();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/signup',signup)
router.post('/login',login)
router.post('/createproject',createProject)
router.post('/saveProject',saveProject)
router.post('/getProjects',getProjects)
router.post('/getProject',getProject)
router.post('/deleteProject',deleteProject)
router.post('/editProject',editProject)
router.post("/runCode", runCode)






module.exports = router;
