import LocalStrategy from 'passport-local';
import { Strategy, ExtractJwt } from 'passport-jwt';

import User from '../users/user.model.js';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

export const jwtStrategyCallback = async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);

    if (!user) {
      return done(null, false);
    }

    if (!payload.exp || payload.exp <= Date.now()) {
      return done(null, false, {
        message: 'Token has expired'
      });
    }

    done(null, user);
  } catch (e) {
    done(e, false);
  }
};

export const localStrategyCallback = async (email, password, done) => {
  const message = 'Incorrect email or password';

  try {
    const user = await User.findOne({
      email
    });

    if (!user) {
      return done(null, false, {
        message
      });
    }

    user.comparePassword(password, (error, isMatch) => {
      if (error) {
        return done(error, false);
      }

      if (!isMatch) {
        return done(null, false, {
          message
        });
      }

      return done(null, user);
    });
  } catch (e) {
    done(e, false);
  }
};

export const jwtLogin = new Strategy(jwtOptions, jwtStrategyCallback);
export const localLogin = new LocalStrategy(
  {
    usernameField: 'email'
  },
  localStrategyCallback
);

