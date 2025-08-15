import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../assets/mainLogo.png';
import * as S from '../components/common/AuthStyles';
import userIcon from '../assets/mypage.png';
import lockIcon from '../assets/lock.png';
import useAuth from '../components/hooks/useAuth'; 
import { User } from '../types'; 

const LoginPage = () => {
  const [student_id, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth(); // 전역 상태를 업데이트할 setUser 함수

  const handleLogin = () => {
    const tempId = '25012345';
    const tempPassword = '1234';

   
    if (student_id === tempId && password === tempPassword) {
      // 임시 사용자 객체 생성
      const mockUser: User = {
        id: 1,
        student_id: student_id,
        nickname: '임시사용자',
        password: '', 
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // "로그인된 상태"로 만들기
      setUser(mockUser);
      navigate('/'); 
    } else {
      alert('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <S.AuthPageContainer>
      <Link to ="/">
        <S.Logo src={logoImage} alt="세만추 로고" />
      </Link>
      <S.FieldRow>
        <S.IconWrapper>
          <S.InputIcon src={userIcon} alt="user icon" />
        </S.IconWrapper>
        <S.InputField
          type="text"
          placeholder="아이디(학번)"
          value={student_id}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStudentId(e.target.value)}
        />
      </S.FieldRow>

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
