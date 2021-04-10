import request from 'supertest';
import jwt from 'jwt-simple';
import signale from 'signale';

// disable logging during testing
signale.disable();

import app from '../../app.js';

jest.mock('../auth.controllers', () => ({
  ...jest.requireActual('../auth.controllers'),
  requireAuth: (req, res, next) => {
    req.isAuthenticated = () => true;

    next();
  },
  requireLogin: (req, res, next) => {
    next();
  }
}));

jest.mock('../auth.services', () => ({
  ...jest.requireActual('../auth.services'),
  sendEmail: () => ({
    status: 'ok',
    message: 'email sent successfully!'
  })
}));

import User from '../../users/user.model';

const email = 'test@gmail.com';
const password = 'password';

const user = {
  _id: 1,
  email,
  name: 'test'
};

describe('Auth API Tests', () => {
  describe('GET /api/status tests', () => {
    test('it should return true', async () => {
      const response = await request(app)
        .get('/api/status');

      expect(response.statusCode)
        .toBe(200);
      expect(response.body)
        .toEqual({
          isAuthenticated: true
        });
    });
  });

  describe('POST /api/login tests', () => {
    test('it should login successfully', async () => {
      User.findOne = jest.fn()
        .mockResolvedValue(user);

      const response = await request(app)
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({
          email,
          password
        });

      expect(response.statusCode)
        .toBe(200);
      expect(response.body.status)
        .toBe('ok');
    });

    test('it should return internal server error', async () => {
      User.findOne = jest.fn()
        .mockRejectedValue(new Error());

      const response = await request(app)
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({
          email,
          password
        });

      expect(response.statusCode)
        .toBe(500);
    });

    test('it should return email required error', async () => {
      User.findOne = jest.fn()
        .mockResolvedValue(user);

      const response = await request(app)
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({
          password
        });

      expect(response.statusCode)
        .toBe(200);
      expect(response.body.status)
        .toBe('fail');
      expect(response.body.field)
        .toBe('email');
    });

    test('it should return password required error', async () => {
      User.findOne = jest.fn()
        .mockResolvedValue(user);

      const response = await request(app)
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({
          email
        });

      expect(response.statusCode)
        .toBe(200);
      expect(response.body.status)
        .toBe('fail');
      expect(response.body.field)
        .toBe('password');
    });
  });

  describe('POST /api/forgot Tests', () => {
    test('it should send password forgot request successfully', async () => {
      User.findOne = jest.fn()
        .mockResolvedValue(user);

      const response = await request(app)
        .post('/api/forgot')
        .set('Accept', 'application/json')
        .send({
          email
        });

      expect(response.statusCode)
        .toBe(200);
      expect(response.body.status)
        .toBe('ok');
    });

    test('it should return internal server error', async () => {
      User.findOne = jest.fn()
        .mockRejectedValue(new Error());

      const response = await request(app)
        .post('/api/forgot')
        .set('Accept', 'application/json')
        .send({
          email
        });

      expect(response.statusCode)
        .toBe(500);
    });

    test('it should return email required error', async () => {
      User.findOne = jest.fn()
        .mockResolvedValue(user);

      const response = await request(app)
        .post('/api/forgot')
        .set('Accept', 'application/json')
        .send({});

      expect(response.statusCode)
        .toBe(200);
      expect(response.body.status)
        .toBe('fail');
      expect(response.body.field)
        .toBe('email');
    });

    test('it should return user not found error', async () => {
      User.findOne = jest.fn()
        .mockResolvedValue(null);

      const response = await request(app)
        .post('/api/forgot')
        .set('Accept', 'application/json')
        .send({
          email
        });

      expect(response.statusCode)
        .toBe(200);
      expect(response.body.status)
        .toBe('fail');
      expect(response.body.field)
        .toBe('email');
    });
  });

  describe('POST /api/reset Tests', () => {
    const token = 'TEST_TOKEN';

    test('it should reset password successfully', async () => {
      const exp = Date.now() + 60 * 1000;
      jwt.decode = jest.fn()
        .mockReturnValue({
          sub: email,
          exp
        });

      const saveMock = jest.fn()
        .mockResolvedValue(user);
      user.save = saveMock;

      User.findOne = jest.fn()
        .mockResolvedValue(user);

      const response = await request(app)
        .post('/api/reset')
        .set('Accept', 'application/json')
        .send({
          password,
          rePassword: password,
          token
        });

      expect(saveMock.mock.calls.length)
        .toBe(1);
      expect(response.statusCode)
        .toBe(200);
      expect(response.body.status)
        .toBe('ok');
    });

    test('it should return token expired error', async () => {
      const exp = Date.now() - 60 * 1000;
      jwt.decode = jest.fn()
        .mockReturnValue({
          sub: email,
          exp
        });

      const response = await request(app)
        .post('/api/reset')
        .set('Accept', 'application/json')
        .send({
          password,
          rePassword: password,
          token
        });

      expect(response.statusCode)
        .toBe(200);
      expect(response.body.status)
        .toBe('fail');
    });

    test('it should return token invalid error', async () => {
      jwt.decode = jest.fn(() => {
        throw new Error();
      });

      const response = await request(app)
        .post('/api/reset')
        .set('Accept', 'application/json')
        .send({
          password,
          rePassword: password,
          token
        });

      expect(response.statusCode)
        .toBe(200);
      expect(response.body.status)
        .toBe('fail');
    });

    test('it should return internal server error', async () => {
      const exp = Date.now() + 60 * 1000;
      jwt.decode = jest.fn()
        .mockReturnValue({
          sub: email,
          exp
        });

      User.findOne = jest.fn()
        .mockRejectedValue(new Error());

      const response = await request(app)
        .post('/api/reset')
        .set('Accept', 'application/json')
        .send({
          password,
          rePassword: password,
          token
        });

      expect(response.statusCode)
        .toBe(500);
    });

    test('it should return password required error', async () => {
      const response = await request(app)
        .post('/api/reset')
        .set('Accept', 'application/json')
        .send({
          rePassword: password,
          token
        });

      expect(response.statusCode)
        .toBe(200);
      expect(response.body.status)
        .toBe('fail');
      expect(response.body.field)
        .toBe('password');
    });

    test('it should return rePassword required error', async () => {
      const response = await request(app)
        .post('/api/reset')
        .set('Accept', 'application/json')
        .send({
          password,
          token
        });

      expect(response.statusCode)
        .toBe(200);
      expect(response.body.status)
        .toBe('fail');
      expect(response.body.field)
        .toBe('rePassword');
    });

    test('it should return token required error', async () => {
      const response = await request(app)
        .post('/api/reset')
        .set('Accept', 'application/json')
        .send({
          password,
          rePassword: password
        });

      expect(response.statusCode)
        .toBe(200);
      expect(response.body.status)
        .toBe('fail');
      expect(response.body.field)
        .toBe('token');
    });

    test('it should return Passwords don\'t match error', async () => {
      const rePassword = 'rePassword';

      const response = await request(app)
        .post('/api/reset')
        .set('Accept', 'application/json')
        .send({
          password,
          rePassword,
          token
        });

      expect(response.statusCode)
        .toBe(200);
      expect(response.body.status)
        .toBe('fail');
      expect(response.body.field)
        .toBe('rePassword');
    });
  });
});
