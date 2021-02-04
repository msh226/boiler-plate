import { LOGIN_USER, REGISTER_USER, AUTH_USER } from '../_actions/types'

export default function (state = {}, action) {
  switch (action.type) { // 액션의 타입이
    case LOGIN_USER: // login_user라면
      return { ...state, loginSuccess: action.payload } // state 업데이트
    case REGISTER_USER: // register_user 라면
      return { ...state, register: action.payload } // state 업데이트
    case AUTH_USER: // auth_user 라면
      return { ...state, userData: action.payload } // state 업데이트
    default:
      return state;
  }
}