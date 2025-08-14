// /src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../assets/mainLogo.png'; 
import * as S from '../components/common/AuthStyles'; 
import userIcon from '../assets/mypage.png';
import lockIcon from '../assets/lock.png';

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('로그인 시도:', id, password);
    navigate('/');
  };

  return (
    <S.AuthPageContainer>
      <S.Logo src={logoImage} alt="세만추 로고" />
      
      {/* 🎨 아이콘을 IconWrapper로 감싸줍니다. */}
      <S.FieldRow>
        <S.IconWrapper>
          <S.InputIcon src={userIcon} alt="user icon" />
        </S.IconWrapper>
        <S.InputField
          type="text"
          placeholder="아이디(학번)"
          value={id}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setId(e.target.value)}
        />
      </S.FieldRow>

      {/* 🎨 아이콘을 IconWrapper로 감싸줍니다. */}
      <S.FieldRow>
        <S.IconWrapper>
          <S.InputIcon src={lockIcon} alt="lock icon" />
        </S.IconWrapper>
        <S.InputField
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
      </S.FieldRow>

      <S.AuthButton onClick={handleLogin}>로그인</S.AuthButton>
      <S.ActionLink>
        계정이 없으신가요? <Link to="/signup">회원가입</Link>
      </S.ActionLink>
    </S.AuthPageContainer>
  );
};

export default LoginPage;