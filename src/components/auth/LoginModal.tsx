import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logoImage from '../../assets/mainLogo.png';
import userIcon from '../../assets/mypage.png';
import lockIcon from '../../assets/lock.png';
import useAuth from '../hooks/useAuth';
import { User } from '../../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignup: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSwitchToSignup }) => {
  const [student_id, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false); // 오류 표시 상태 추가
  const navigate = useNavigate();
  const { setUser } = useAuth();

  if (!isOpen) return null;

  const handleLogin = () => {
    const tempId = '25012345';
    const tempPassword = '1234';

    if (student_id === tempId && password === tempPassword) {
      const mockUser: User = {
        id: 1,
        student_id: student_id,
        nickname: '임시사용자',
        password: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setUser(mockUser);
      setShowError(false); // 로그인 성공 시 오류 숨기기
      onClose();
      navigate('/');
    } else {
      setShowError(true); // 로그인 실패 시 오류 표시
    }
  };

  // 입력값이 변경될 때 오류 메시지 숨기기
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    if (showError) {
      setShowError(false);
    }
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
            placeholder="아이디"
            value={student_id}
            onChange={handleInputChange(setStudentId)}
          />
        </InputWrapper>

        <InputWrapper>
          <Icon src={lockIcon} alt="lock icon" />
          <InputField
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={handleInputChange(setPassword)}
          />
        </InputWrapper>

        {showError && (
          <ErrorMessage>아이디 또는 비밀번호를 다시 확인해 주세요.</ErrorMessage>
        )}

        <LoginButton onClick={handleLogin}>로그인</LoginButton>

        <BottomLinks>
          <LinkButton>아이디 찾기</LinkButton>
          <Separator>|</Separator>
          <LinkButton>비밀번호 찾기</LinkButton>
          <Separator>|</Separator>
          <LinkButton onClick={onSwitchToSignup}>회원가입</LinkButton>
        </BottomLinks>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LoginModal;

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

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 0.85rem;
  margin-bottom: 1.5rem;
  text-align: center;
  width: 100%;
`;

const LoginButton = styled.button`
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

const BottomLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
`;

const LinkButton = styled.span`
  color: #666;
  cursor: pointer;
  text-decoration: none;
  
  &:hover {
    color: #504791;
    text-decoration: underline;
  }
`;

const Separator = styled.span`
  color: #ccc;
`;