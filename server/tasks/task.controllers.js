import signale from 'signale';

import Task from './task.model.js';

export const getTasks = async (req, res) => {
  const user = req.user._id;

  try {
    const tasks = await Task.find({
      user
    })
      .sort({ createdAt: 1 });

    res.json({
      tasks,
      status: 'ok'
    });
  } catch (e) {
    res.status(500)
      .send('Internal server error');

    signale.fatal('Error occured in getTasks', e);
  }
};

export const createTask = async (req, res) => {
  const user = req.user._id;
  const { title } = req.body;

  try {
    const newTask = {
      title,
      user
    };

    const task = await new Task(newTask).save();

    res.json({
      task,
      status: 'ok'
    });
  } catch (e) {
    res.status(500)
      .send('Internal server error');

    signale.fatal('Error occured in createTask', e);
  }
};

export const updateTask = async (req, res) => {
  const user = req.user._id;
  const taskId = req.params.id;
  const {
    title,
    status
  } = req.body;

  try {
    const task = await Task.findOne({
      _id: taskId,
      user
    });

    if (!task) {
      return res.json({
        message: 'You are not allowed to update this task',
        status: 'fail'
      });
    }

    task.title = title;
    task.status = status;

    const updatedTask = await task.save();

    res.json({
      task: updatedTask,
      status: 'ok'
    });
  } catch (e) {
    res.status(500)
      .send('Internal server error');

    signale.fatal('Error occured in updateTask', e);
  }
};

export const deleteTask = async (req, res) => {
  const user = req.user._id;
  const taskId = req.params.id;

  try {
    const { n } = await Task.remove({
      _id: taskId,
      user
    });

    if (n === 0) {
      return res.json({
        message: 'You are not allowed to delete this task',
        status: 'fail'
      });
    }

    res.json({
      _id: taskId,
      status: 'ok'
    });
  } catch (e) {
    res.status(500)
      .send('Internal server error');

    signale.fatal('Error occured in deleteTask', e);
  }
};
