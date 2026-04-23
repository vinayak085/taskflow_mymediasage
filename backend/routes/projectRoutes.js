const express = require('express');
const router = express.Router();

const {
  createProject,
  getProjects,
  getProjectById,
  deleteProject
} = require('../controllers/projectController');

router.post('/projects', createProject);
router.get('/projects', getProjects);
router.get('/projects/:id', getProjectById);
router.delete('/projects/:id', deleteProject);

module.exports = router;