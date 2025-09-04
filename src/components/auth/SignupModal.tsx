import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logoImage from '../../assets/mainLogo.png';
import userIcon from '../../assets/mypage.png';
import lockIcon from '../../assets/lock.png';
import useAuth from '../hooks/useAuth';
import { User } from '../../types';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [student_id, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [isIdChecked, setIsIdChecked] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  if (!isOpen) return null;

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
    onSwitchToLogin();
  };

  const handleIdCheck = () => {
    if (!student_id.trim()) {
      alert('아이디를 입력해주세요.');
      return;
    }
    alert('사용 가능한 아이디입니다.');
    setIsIdChecked(true);
  };

  const handleIdInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentId(e.target.value);
    setIsIdChecked(false);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        
        <Logo src={logoImage} alt="세만추 로고" />
        
        <InputWrapper>
          <Icon src={userIcon} alt="user icon" />
          <InputField
            type="text"
            placeholder="이름(닉네임)"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </InputWrapper>

        <IdCheckWrapper>
          <InputWrapperWithIcon>
            <Icon src={userIcon} alt="user icon" />
            <InputField
              type="text"
              placeholder="아이디(학번)"
              value={student_id}
              onChange={handleIdInputChange}
            />
          </InputWrapperWithIcon>
          <CheckButton
            onClick={handleIdCheck}
            disabled={isIdChecked}
            isChecked={isIdChecked}
          >
            중복확인
          </CheckButton>
        </IdCheckWrapper>
        
        <InputWrapper>
          <Icon src={lockIcon} alt="lock icon" />
          <InputField
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputWrapper>

        <InputWrapper>
          <Icon src={lockIcon} alt="lock icon" />
          <InputField
            type="password"
            placeholder="비밀번호 재입력"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </InputWrapper>
        
        <SignupButton onClick={handleSignup}>회원가입</SignupButton>
        
        <LinkText>
          이미 계정이 있으신가요? <LinkButton onClick={onSwitchToLogin}>로그인</LinkButton>
        </LinkText>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SignupModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  background: white;
  border-radius: 16px;
  padding: 3rem 2.5rem;
  width: 400px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #666;
  }
`;

const Logo = styled.img`
  width: 180px;
  height: auto;
  margin-bottom: 3rem;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1.5rem;
`;

const InputWrapperWithIcon = styled.div`
  position: relative;
  flex: 1;
  margin-right: 0.5rem;
`;

const Icon = styled.img`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  opacity: 0.6;
`;

const InputField = styled.input`
  width: 100%;
  padding: 1.2rem 1rem 1.2rem 3rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: #999;
  }

  &:focus {
    border-color: #504791;
  }
`;

const IdCheckWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1.5rem;
  align-items: center;
`;

const CheckButton = styled.button<{ isChecked?: boolean }>`
  padding: 1.2rem 1rem;
  background-color: ${({ isChecked }) => (isChecked ? '#a0a0a0' : '#504791')};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: ${({ isChecked }) => (isChecked ? 'not-allowed' : 'pointer')};
  white-space: nowrap;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${({ isChecked }) => (isChecked ? '#a0a0a0' : '#685DAA')};
  }
`;

const SignupButton = styled.button`
  width: 100%;
  padding: 1.2rem;
  background-color: #504791;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #685DAA;
  }
`;

const LinkText = styled.div`
  color: #666;
  font-size: 0.9rem;
  text-align: center;
`;

const LinkButton = styled.span`
  color: #504791;
  cursor: pointer;
  text-decoration: underline;
  
  &:hover {
    color: #685DAA;
  }
`;