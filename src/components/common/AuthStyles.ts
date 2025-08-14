// /src/components/common/AuthStyles.ts
import styled from 'styled-components';

export const AuthPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: transparent; 
`;

export const Logo = styled.img`
  width: 250px;
  margin-bottom: 3rem;
`;

export const FieldRow = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  max-width: 400px;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  border-radius: 12px;
  overflow: hidden;

  /* 테두리를 FieldRow에 직접 적용하여 끊김 현상을 해결합니다. */
  border: 1px solid #504791;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #504791;
  padding: 0 1rem;
`;

export const InputIcon = styled.img`
  width: 24px;
  height: 24px;
  filter: brightness(0) invert(1);
`;

export const InputField = styled.input`
  flex-grow: 1;
  padding: 1rem;
  
  /* InputField 자체의 테두리를 모두 제거합니다. */
  border: none;
  
  font-size: 1rem;
  background-color: white;
  outline: none;

  &::placeholder {
    color: #b0b0b0;
  }
`;

export const AuthButton = styled.button`
  width: 100%;
  max-width: 400px;
  padding: 1rem;
  background-color: #5834d4;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4a2cb6;
  }
`;

export const ActionLink = styled.div`
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #555;

  a {
    color: #5834d4;
    text-decoration: none;
    font-weight: bold;
  }
`;