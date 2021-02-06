import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './Login.constants';

const initialState = {
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case LOGIN_REQUEST:
      newState = {
        ...state,
        isLoading: true,
        error: null,
      };
      break;
    case LOGIN_SUCCESS:
      {
        const { token, user } = action.payload;

        localStorage.setItem('token', `Bearer ${token}`);
        localStorage.setItem('user', JSON.stringify(user));

        newState = {
          ...state,
          token,
          user,
          isLoading: false,
          error: null,
        };
      }
      break;
    case LOGIN_FAILURE:
      {
        const { message, field } = action.payload;

        newState = {
          ...state,
          isLoading: false,
          error: {
            message,
            field,
          },
        };
      }
      break;
    default:
      newState = state;
  }

  return newState;
};
