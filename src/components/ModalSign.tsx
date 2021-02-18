import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { postSigninAsync, postSignupAsync } from '../modules/sign';
import styled from 'styled-components';

const ModalSign = ({
  setIsSignModal,
}: {
  setIsSignModal: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
  const [isSignup, setIsSignup] = useState(false);
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputCheckPassword, setInputCheckPassword] = useState('');
  const [inputNickname, setInputNickname] = useState('');
  const [message, setMessage] = useState('');
  const { isLogin, signupSuccess, error } = useSelector(
    (state: RootState) => state.sign,
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const isEmail = (email: string) => {
    const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return emailRegex.test(email);
  };

  function isPassword(password: string) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,20}$/;
    return passwordRegex.test(password);
  }

  const handleSignin = () => {
    if (!isEmail(inputEmail)) {
      setMessage('이메일 형식이 올바르지 않습니다.');
    } else if (!inputEmail || !inputPassword) {
      setMessage('아이디와 비밀번호 모두 입력해주세요.');
    } else {
      const signinInfo = {
        email: inputEmail,
        password: inputPassword,
      };
      dispatch(postSigninAsync.request(signinInfo));
    }
  };

  const handleSignup = () => {
    if (!isEmail(inputEmail)) {
      setMessage('이메일 형식이 올바르지 않습니다.');
    } else if (!inputNickname) {
      setMessage('닉네임을 입력해주세요.');
    } else if (!isPassword(inputPassword)) {
      setMessage('8~20자리 사이의 영어와 숫자조합의 비밀번호를 입력해주세요.');
    } else if (inputPassword !== inputCheckPassword) {
      setMessage('비밀번호가 일치하지 않습니다.');
    } else {
      const signinInfo = {
        email: inputEmail,
        nickname: inputNickname,
        password: inputPassword,
      };
      dispatch(postSignupAsync.request(signinInfo));
    }
  };

  useEffect(() => {
    if (isLogin) {
      localStorage.setItem('islogin', 'true');
      setMessage('');
      setIsSignModal((state) => !state);
      history.push('/');
    } else if (signupSuccess) {
      setIsSignModal((state) => !state);
      history.push('/');
    } else if (error) {
      setMessage('SIGNIN/SIGNUP 작업에 실패하였습니다.');
    }
  }, [isLogin, error, signupSuccess]);

  return (
    <SignPresenter onClick={() => setIsSignModal((state) => !state)}>
      {!isSignup ? (
        <SigninBox onClick={(e) => e.stopPropagation()}>
          <SigninTitle> FESSPORT LOGIN </SigninTitle>
          <InputEmail
            type="email"
            placeholder="E-MAIL"
            onChange={(e) => setInputEmail(e.target.value)}
          />
          <InputEmail
            type="password"
            placeholder="PASSWORD"
            onChange={(e) => setInputPassword(e.target.value)}
          />
          <MessagePresenter>{message}</MessagePresenter>
          <SignButton onClick={handleSignin}>LOGIN</SignButton>
          <SignButton onClick={() => setIsSignup(true)}>SINGUP</SignButton>
        </SigninBox>
      ) : (
        <SigninBox onClick={(e) => e.stopPropagation()}>
          <SigninTitle> FESSPORT SIGNUP </SigninTitle>
          <InputEmail
            type="email"
            placeholder="E-MAIL"
            onChange={(e) => setInputEmail(e.target.value)}
          />
          <InputEmail
            placeholder="NICKNAME"
            onChange={(e) => setInputNickname(e.target.value)}
          />
          <InputEmail
            type="password"
            placeholder="PASSWORD"
            onChange={(e) => setInputPassword(e.target.value)}
          />
          <InputEmail
            type="password"
            placeholder="CHECK PASSWORD"
            onChange={(e) => setInputCheckPassword(e.target.value)}
          />
          <MessagePresenter>{message}</MessagePresenter>
          <SignButton onClick={handleSignup}>SIGNUP</SignButton>
        </SigninBox>
      )}
    </SignPresenter>
  );
};

const SignPresenter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(30, 30, 30, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const SigninBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  height: 60%;
  border-radius: 20px;
`;

const SigninTitle = styled.div`
  margin-bottom: 10%;
  font-size: 3rem;
`;

const InputEmail = styled.input`
  width: 100%;
  margin-top: 5%;
  margin-bottom: 5%;
  padding: 15px;
  padding-left: 20px;
  color: white;
  border-bottom: 1px solid gray;
  background: transparent;
  font-size: 1rem;
  &:hover {
    outline: 1px solid white;
  }
  &:focus {
    background: rgba(170, 170, 170, 0.3);
  }
`;

const MessagePresenter = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 5%;
  text-align: center;
  color: rgba(255, 101, 101, 0.8);
  font-size: 1rem;
`;

const SignButton = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-size: 1rem;
  border-bottom: 1px solid transparent;
  cursor: pointer;
  &:hover {
    border-bottom: 1px solid rgba(0, 250, 250);
  }
  transition: all 0.2s ease-in-out;
`;

export default ModalSign;
