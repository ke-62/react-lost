import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../assets/mainLogo.png';
import * as S from '../components/common/AuthStyles';
import userIcon from '../assets/mypage.png';
import lockIcon from '../assets/lock.png';
import useAuth from '../components/hooks/useAuth'; 
import { User } from '../types'; 

const SignupPage = () => {
  const [student_id, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [isIdChecked, setIsIdChecked] = useState(false); // 아이디 확인 상태 추가
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSignup = () => {
    if (!isIdChecked) {
      alert('아이디 중복 확인을 해주세요.');
      return;
    }
    if (!nickname || !student_id || !password || !confirmPassword) {
      alert('모든 필드를 입력해주세요.');
      return; 
    }
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return; 
    }

    const newUser: User = {
      id: Date.now(), 
      student_id: student_id,
      nickname: nickname,
      password: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    alert('회원가입이 완료되었습니다.');
    navigate('/login');
  };

  const handleIdCheck = () => {
    if (!student_id.trim()) {
      alert('아이디를 입력해주세요.');
      return;
    }
    // (실제로는 여기서 백엔드 API로 중복 확인 요청을 보냅니다)
    alert('사용 가능한 아이디입니다.');
    setIsIdChecked(true);
  };

  const handleIdInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentId(e.target.value);
    setIsIdChecked(false); 
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
          placeholder="이름(닉네임)"
          value={nickname}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
        />
      </S.FieldRow>

      <FieldWithButtonWrapper>
        <S.FieldRow style={{ flexGrow: 1, marginRight: '1rem', marginBottom: 0 }}>
          <S.IconWrapper>
            <S.InputIcon src={userIcon} alt="user icon" />
          </S.IconWrapper>
          <S.InputField
            type="text"
            placeholder="아이디(학번)"
            value={student_id}
            onChange={handleIdInputChange} 
          />
        </S.FieldRow>
        <CheckButton 
          onClick={handleIdCheck}
          disabled={isIdChecked} 
          isChecked={isIdChecked} 
        >
          {isIdChecked ? '완료' : '아이디 중복 확인'}
        </CheckButton>
      </FieldWithButtonWrapper>
      
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

      <S.FieldRow>
        <S.IconWrapper>
          <S.InputIcon src={lockIcon} alt="lock icon" />
        </S.IconWrapper>
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

const CheckButton = styled.button<{ isChecked?: boolean }>`
  padding: 0.9rem 1rem;
  background-color: ${({ isChecked }) => (isChecked ? '#a0a0a0' : '#504791')};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: ${({ isChecked }) => (isChecked ? 'not-allowed' : 'pointer')};
  flex-shrink: 0;
  transition: background-color 0.2s ease-in-out;
  
  &:hover {
    background-color: ${({ isChecked }) => (isChecked ? '#a0a0a0' : '#685DAA')};
  }
`;
