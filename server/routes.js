import auth from './auth/auth.routes.js';
import users from './users/user.routes.js';
import tasks from './tasks/task.routes.js';

const AppRoutes = (app) => {
  app.use('/api', auth);
  app.use('/api', users);
  app.use('/api', tasks);

  app.all('/api/*', (req, res) => {
    res.status(404)
      .send('API Not Found');
  });
};

export default AppRoutes;
