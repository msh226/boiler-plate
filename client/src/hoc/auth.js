
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action'


export default function (SpecificComponent, option, adminRoute = null) {

  // SpecificComponent = 컴포넌트

  // option = 접근 권한
  // null => 아무나 출입 가능한 페이지
  // true => 로그인한 유저만 출입 가능
  // false => 로그인 한 유저는 출입 불가능

  // adminRoute = 관리자 페이지

  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then(response => {


        if (!response.payload.isAuth) { // 로그인 상태가 아닐 때

          if (option) {
            props.history.push('/login')
          }

        } else { //로그인 상태일 때

          // 관리자가 아닌데 관리자 페이지에 접근했을 때
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push('/')
          } else {
            if (option === false)
              props.history.push('/')
          }
        }
      })
    }, [])

    return (
      <SpecificComponent />
    )
  }

  return AuthenticationCheck
}


