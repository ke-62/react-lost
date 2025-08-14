// /src/pages/SignupPage.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../assets/mainLogo.png'; 
import * as S from '../components/common/AuthStyles';

import userIcon from '../assets/mypage.png';
import lockIcon from '../assets/lock.png';

const SignupPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    console.log('회원가입 시도:', { id, password, nickname });
    navigate('/login');
  };

  const handleIdCheck = () => {
    alert('사용 가능한 아이디입니다.');
  };

  return (
    <S.AuthPageContainer>
      <S.Logo src={logoImage} alt="세만추 로고" />
      
      <S.FieldRow>
        <S.InputIcon src={userIcon} alt="user icon" />
        <S.InputField
          type="text"
          placeholder="이름(닉네임)"
          value={nickname}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
        />
      </S.FieldRow>

      <FieldWithButtonWrapper>
        <S.FieldRow style={{ flexGrow: 1, marginRight: '1rem', marginBottom: 0 }}>
          <S.InputIcon src={userIcon} alt="user icon" />
          <S.InputField
            type="text"
            placeholder="아이디(학번)"
            value={id}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setId(e.target.value)}
          />
        </S.FieldRow>
        <CheckButton onClick={handleIdCheck}>아이디 중복 확인</CheckButton>
      </FieldWithButtonWrapper>

      <S.FieldRow>
        <S.InputIcon src={lockIcon} alt="lock icon" />
        <S.InputField
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
      </S.FieldRow>

      <S.FieldRow>
        <S.InputIcon src={lockIcon} alt="lock icon" />
        <S.InputField
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
        />
      </S.FieldRow>
      
      <S.AuthButton onClick={handleSignup}>회원가입</S.AuthButton>
      <S.ActionLink>
        이미 계정이 있으신가요? <Link to="/login">로그인</Link>
      </S.ActionLink>
    </S.AuthPageContainer>
  );
};

export default SignupPage;

const FieldWithButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin-bottom: 1.5rem;
`;

const CheckButton = styled.button`
  padding: 0.9rem 1rem;
  background-color: #504791;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  flex-shrink: 0;
  transition: background-color 0.2s ease-in-out;
  
  &:hover {
    background-color: #685DAA;
  }
`;