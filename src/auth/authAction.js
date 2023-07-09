export const LOGIN_START = "LOGIN_START"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAIL = "LOGIN_FAIL"
export const LOGOUT = "LOGOUT"
export const ADDED_TO_FAVORITE = 'ADDED_TO_FAVORITE'
export const REMOVE_FROM_FAVORITE = 'REMOVE_FROM_FAVORITE'


export const LoginStart = ()=>({
    type:LOGIN_START
})

export const LoginSuccess = (user)=>({
    type:LOGIN_SUCCESS,payload:user
})
export const LoginFail = ()=>({
    type:LOGIN_FAIL
})
export const Logout = ()=>({
    type:LOGOUT
})
export const AddToFavorite = (content) => ({
    type: ADDED_TO_FAVORITE, payload: content
})
export const RemoveFromFavorite = (content) => ({
    type: REMOVE_FROM_FAVORITE, payload: content
})