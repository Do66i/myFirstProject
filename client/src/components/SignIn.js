import axios from 'axios';
import React, { useState, useCallback, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { stateContext } from '../store';
import './Sign.css';

function SignIn() {
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');

  const context = useContext(stateContext);

  const navigate = useNavigate();

  const onIdHandler = event => {
    setId(event.currentTarget.value);
  };

  const onPasswordHandler = event => {
    setPwd(event.currentTarget.value);
  };

  const onReset = useCallback(() => {
    setId('');
    setPwd('');
  }, [setId, setPwd]);

  const onLogin = event => {
    event.preventDefault();

    if (!id || !pwd) {
      alert('모든 값을 정확하게 입력해주세요');
      return;
    }

    axios
      .post('https://www.remembertrip.tk/signin', {
        user_id: id,
        password: pwd,
      })
      .then(data => {
        context.funcs.loginHandler(id, pwd, data.data.data);
      })
      .then(() => {
        alert('로그인');
        navigate('/');
        onReset();
      });
  };

  return (
    <div className="SignIn">
      <div className="SignInDiv1">
        <div>
          <h1>Remember Trip</h1>
        </div>
        <div className="SignInInput">
          <form>
            <label htmlFor="user_id">user_id</label>
            <input
              id="user_id"
              value={id}
              onChange={onIdHandler}
              placeholder="아이디를 입력해요"
              required
            />
            <hr />
            <label htmlFor="user_pwd">PASSWORD</label>
            <input
              type="password"
              id="user_pwd"
              value={pwd}
              onChange={onPasswordHandler}
              placeholder="비밀번호를 입력해요"
              required
            />
            <hr />
          </form>
        </div>
      </div>
      <div className="SignInBts">
        <div>
          <button type="submit" value="로그인" onClick={onLogin}>
            시작해요
          </button>
        </div>
        <Link to="/sign-up">
          <div>
            <button type="submit" value="회원가입">
              함께해요
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
