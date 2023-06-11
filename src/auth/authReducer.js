import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT , ADDED_TO_FAVORITE} from './authAction'
import { AddToMyFavorite } from './authApiCalls'

export const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_START: {
      return { user: null, isFatching: true, error: false }
    }
    case LOGIN_SUCCESS: {
      return { user: action.payload, isFatching: false, error: false }
    }
    case LOGIN_FAIL: {
      return { user: null, isFatching: false, error: true }
    }
    case LOGOUT: {
      return { user: null, isFatching: false, error: false }
    }
    case ADDED_TO_FAVORITE: {
      let myList =[];
      if(state.user.myList){
        myList = state.user.myList
      }
      AddToMyFavorite(state.user, action.payload._id)
      return { user:{...state.user, myList: [...myList ,action.payload]}}
    }
    default: {
      return { ...state }
    }
  }
}
