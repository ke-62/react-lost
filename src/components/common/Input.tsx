// /src/components/common/Input.tsx
// 프로젝트 전반에서 사용될 재사용 가능한 Input 컴포넌트
import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export default Input;