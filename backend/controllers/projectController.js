const Project = require('../models/Project');

// Create Project
exports.createProject = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const project = await Project.create({ name, description });
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

// Get Projects (Pagination)
exports.getProjects = async (req, res, next) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = Number(page);
    limit = Number(limit);

    const skip = (page - 1) * limit;

    const projects = await Project.find()
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 });

    const total = await Project.countDocuments();

    res.json({
      total,
      page,
      limit,
      data: projects
    });
  } catch (err) {
    next(err);
  }
};

// Get Single Project
exports.getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (err) {
    next(err);
  }
};

// Delete Project
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted' });
  } catch (err) {
    next(err);
  }
};