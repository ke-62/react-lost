// /src/components/chat/MessageInput.tsx
// 채팅 메시지를 입력하고 전송하는 컴포넌트
import React, { useState } from 'react';
import styled from 'styled-components';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message); //
      setMessage('');
    }
  };

  return (
    <InputForm onSubmit={handleSubmit}>
      <Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="메시지를 입력하세요..."
      />
      <SendButton type="submit">전송</SendButton>
    </InputForm>
  );
};

export default MessageInput;

const InputForm = styled.form`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
`;

const SendButton = styled.button`
  margin-left: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  cursor: pointer;
`;