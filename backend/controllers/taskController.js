const Task = require('../models/Task');

// Create Task
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, due_date } = req.body;

    const task = await Task.create({
      project_id: req.params.projectId,
      title,
      description,
      status,
      priority,
      due_date
    });

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

// Get Tasks (Filter + Sort)
exports.getTasks = async (req, res, next) => {
  try {
    const { status, sort } = req.query;

    let query = { project_id: req.params.projectId };

    if (status) {
      query.status = status;
    }

    let tasksQuery = Task.find(query);

    // Sort by due_date
    if (sort === 'due_date') {
      tasksQuery = tasksQuery.sort({ due_date: 1 });
    }

    const tasks = await tasksQuery;

    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

// Update Task
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (err) {
    next(err);
  }
};

// Delete Task
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};