import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Sign.css';

function SignUp() {
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [errorMessage, setErrorMessage] = useState({
    idError: '',
    pwdError: '',
    confirmPwdError: '',
  });

  const navigate = useNavigate();

  const onIdHandler = event => {
    setId(event.currentTarget.value);
  };

  const onPasswordHandler = event => {
    setPwd(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = event => {
    setConfirmPwd(event.currentTarget.value);
  };

  const { idError, pwdError, confirmPwdError } = errorMessage;

  const inputRegexs = {
    idReg: /^[A-za-z0-9]{5,15}$/g,
    pwdReg: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g,
  };
  const validationCheck = useCallback(
    (input, regex) => {
      let isValidate = false;
      if (input === '') {
        isValidate = false;
      } else if (regex.test(input)) {
        isValidate = true;
      } else {
        isValidate = false;
      }
      return isValidate;
    },
    [pwd, id],
  );

  const onReset = useCallback(() => {
    setId('');
    setPwd('');
    setConfirmPwd('');
  }, [setId, setPwd, setConfirmPwd]);

  /* 아이디 체크 */
  useEffect(() => {
    if (validationCheck(id, inputRegexs.idReg) || id === '') {
      setErrorMessage({
        ...errorMessage,
        idError: '',
      });
    } else {
      setErrorMessage({
        ...errorMessage,
        idError: '아이디는 영문 또는 숫자로 5~15자 이여야 합니다.',
      });
    }
  }, [id]);

  /* 비밀번호 체크 */
  useEffect(() => {
    if (validationCheck(pwd, inputRegexs.pwdReg) || pwd === '') {
      setErrorMessage({
        ...errorMessage,
        pwdError: '',
      });
    } else {
      setErrorMessage({
        ...errorMessage,
        pwdError:
          '비밀번호는 최소 하나의 문자 및 하나의 숫자로 8자 이상이여야 합니다.',
      });
    }
  }, [pwd]);

  /* 비밀번호 확인 체크 */
  useEffect(() => {
    if (pwd === confirmPwd || confirmPwd === '') {
      setErrorMessage({
        ...errorMessage,
        confirmPwdError: '',
      });
    } else {
      setErrorMessage({
        ...errorMessage,
        confirmPwdError: '비밀번호 확인이 일치하지 않습니다.',
      });
    }
  }, [confirmPwd]);

  const onSignUp = event => {
    event.preventDefault();

    if (!id || !pwd || !confirmPwd) {
      alert('모든 값을 정확하게 입력해주세요');
      return;
    }

    if (idError) {
      alert('아이디가 형식에 맞지 않습니다');
      return;
    }
    if (pwdError) {
      alert('비밀번호가 형식에 맞지 않습니다');
      return;
    }
    if (confirmPwdError) {
      alert('비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    alert('회원 가입 완료');

    axios.post('https://www.remembertrip.tk/signup', {
      user_id: id,
      password: pwd,
    });

    navigate('/sign-in');
    onReset();
  };

  return (
    <div className="SignUp">
      <form style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="SignUpDivBox">
          <h1>회원가입</h1>
          <div>
            <label className="SignUpInput" htmlFor="inputId">
              ID
            </label>
          </div>
          <input
            id="inputId"
            type="text"
            placeholder="아이디를 입력하세요"
            value={id}
            onChange={onIdHandler}
            required
          />
        </div>
        {idError ? errorMessage.idError : ''}
        <div className="SignUpDivBox">
          <div>
            <label htmlFor="imputPwd">PASSWORD</label>
          </div>
          <div>
            <input
              id="inputPwd"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={pwd}
              onChange={onPasswordHandler}
              required
            />
          </div>
        </div>
        {pwdError ? errorMessage.pwdError : ''}
        <div className="SignUpDivBox">
          <div>
            <label htmlFor="inputCpwd">CHECK PASSWORD</label>
          </div>
          <div>
            <input
              id="inputCpwd"
              type="password"
              placeholder="비밀번호 확인을 입력하세요"
              value={confirmPwd}
              onChange={onConfirmPasswordHandler}
              required
            />
          </div>
        </div>
        {confirmPwdError ? errorMessage.confirmPwdError : ''}
        <button
          className="SingUpSubmitBtn"
          type="submit"
          value="가입"
          onClick={onSignUp}
        >
          SignUp
        </button>
        <Link style={{ textDecoration: 'none' }} to="/sign-in">
          <span>already have?</span>
        </Link>
      </form>
    </div>
  );
}

export default SignUp;
