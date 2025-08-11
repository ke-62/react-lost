// /src/components/chat/ChatBubble.tsx
// 채팅 메시지 하나를 표시하는 말풍선 컴포넌트
import React from 'react';
import styled from 'styled-components';
import { Message } from '../../types';

interface ChatBubbleProps {
  message: Message;
  isMine: boolean; // 내가 보낸 메시지인지 여부
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isMine }) => {
  return (
    <BubbleWrapper isMine={isMine}>
      <Bubble isMine={isMine}>{message.content}</Bubble>
      <Timestamp>{new Date(message.created_at).toLocaleTimeString()}</Timestamp>
    </BubbleWrapper>
  );
};

export default ChatBubble;

const BubbleWrapper = styled.div<{ isMine: boolean }>`
  display: flex;
  justify-content: ${({ isMine }) => (isMine ? 'flex-end' : 'flex-start')};
  margin-bottom: 10px;
  align-items: flex-end;
`;

const Bubble = styled.div<{ isMine: boolean }>`
  background-color: ${({ isMine, theme }) => (isMine ? theme.colors.primary : '#f1f1f1')};
  color: ${({ isMine }) => (isMine ? '#fff' : '#000')};
  padding: 10px 15px;
  border-radius: 20px;
  max-width: 70%;
`;

const Timestamp = styled.span`
  font-size: 0.75rem;
  color: #999;
  margin: 0 5px;
`;