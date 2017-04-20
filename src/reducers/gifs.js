import { REQUEST_GIFS, FETCH_FAVORITED_GIFS, AUTH_USER } from '../actions';

const initialState = {
  data: [],
  favorites: [],
  authenticated: false
};

export default function gifs(state = initialState, action) {
  switch (action.type) {
    case REQUEST_GIFS:
      return {
        ...state, data: action.payload.body.data
      }

    case FETCH_FAVORITED_GIFS:
        var arr = [];
        for (var i in action.payload) {
          if (action.payload.hasOwnProperty(i)) {
            arr.push(action.payload[i]);
          }
        }
        return {
          ...state, favorites: arr
        }

      case AUTH_USER:
          return {
            ...state, authenticated: true
          }

    default:
      return state;
  }
}
