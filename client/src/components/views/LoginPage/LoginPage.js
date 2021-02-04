import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom'

function LoginPage(props) {
  const dispatch = useDispatch(); // store 생성

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const onEmailHandler = (e) => {
    setEmail(e.target.value)
  }

  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
  }

  const onSubmitHnadler = (e) => {
    e.preventDefault();

    let body = {
      email: Email,
      password: Password
    }

    dispatch(loginUser(body)) // 리듀서 호출
      .then(response => {
        if (response.payload.loginSuccess) {
          props.history.push('/')
        } else {
          alert('Error')
        }
      })

  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100vh'
    }}>
      <form style={{
        display: 'flex',
        flexDirection: 'column'
      }} onSubmit={onSubmitHnadler}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default withRouter(LoginPage);