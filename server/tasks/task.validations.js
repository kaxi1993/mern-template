import joi from 'joi';

export const validateCreateTask = (req, res, next) => {
  const task = req.body;

  const schema = joi.object()
    .keys({
      title: joi.string()
        .required()
    });

  const { error } = joi.validate(task, schema);

  if (!error) {
    return next();
  }

  const {
    message,
    context
  } = error.details[0];

  res.json({
    message,
    status: 'fail',
    field: context.key
  });
};

export const validateUpdateTask = (req, res, next) => {
  const task = req.body;

  const schema = joi.object()
    .keys({
      title: joi.string()
        .required(),
      status: joi.string()
        .valid('TODO', 'DONE')
        .required()
    });

  const { error } = joi.validate(task, schema);

  if (!error) {
    return next();
  }

  const {
    message,
    context
  } = error.details[0];

  res.json({
    message,
    status: 'fail',
    field: context.key
  });
};
