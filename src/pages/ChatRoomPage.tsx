// /src/pages/ChatRoomPage.tsx
// 개별 채팅방 페이지
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ChatBubble from '../components/chat/ChatBubble';
import MessageInput from '../components/chat/MessageInput';
import { getChatMessages } from '../api/chatApi';
import { Message } from '../types';
import useAuth from '../components/hooks/useAuth';

const ChatRoomPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (id) {
      const fetchMessages = async () => {
        const res = await getChatMessages(parseInt(id, 10));
        setMessages(res.data);
      };
      fetchMessages();
      // WebSocket 연결 및 이벤트 리스너 설정 로직 필요 (joinRoom 등)
    }
  }, [id]);

  const handleSendMessage = (message: string) => {
    // WebSocket으로 sendMessage 이벤트 전송 로직
    console.log('Sending message:', message);
  };

  return (
    <PageContainer>
      <Header>채팅방</Header>
      <MessageContainer>
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} isMine={msg.user_id === user?.id} />
        ))}
      </MessageContainer>
      <MessageInput onSendMessage={handleSendMessage} />
    </PageContainer>
  );
};

export default ChatRoomPage;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
`;
const Header = styled.header`
  padding: 15px;
  text-align: center;
  border-bottom: 1px solid #ddd;
`;
const MessageContainer = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
`;