import axios from 'axios';
import { LoginFail, LoginStart, LoginSuccess, AddToFavorite } from './authAction';

export const loginCall = async (userCred, dispatch) => {
  dispatch(LoginStart());
  try {
    const res = await axios.post('auth/login', userCred);
    dispatch(res.data ? LoginSuccess(res.data) : LoginFail());
  } catch (error) {
    dispatch(LoginFail());
  }
};

export const registerCall = async (newUser, dispatch) => {
  dispatch(LoginStart());
  try {
    const res = await axios.post('auth/register', newUser);
    dispatch(res.data ? LoginSuccess(res.data) : LoginFail());
  } catch (error) {
    dispatch(LoginFail());
  }
};

export const AddToMyFavorite = async(user, id, dispatch) => {
  try{
    const res  = axios.post('user/addFavorite', {favoriteId:id},{
      headers: { authorization: `Bearer ${user.token}`}
    });
    dispatch(res.data && AddToFavorite(res.data))
  }
  catch(err){
    console.log(err.message);
  }
}
