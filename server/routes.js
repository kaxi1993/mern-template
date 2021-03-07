const auth = require('./auth/auth.routes');
const users = require('./users/user.routes');
const tasks = require('./tasks/task.routes');

module.exports = (app) => {
  app.use('/api', auth);
  app.use('/api', users);
  app.use('/api', tasks);

  app.all('/api/*', (req, res) => {
    res.status(404).send('API Not Found');
  });
};
