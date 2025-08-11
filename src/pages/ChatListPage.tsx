// /src/pages/ChatListPage.tsx
// 내 채팅방 목록을 보여주는 페이지
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getMyChats } from '../api/chatApi';
import { ChatRoom } from '../types';

const ChatListPage = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    const fetchMyChats = async () => {
      try {
        const res = await getMyChats();
        setChatRooms(res.data);
      } catch (error) {
        console.error('채팅 목록을 불러오는 데 실패했습니다.', error);
      }
    };
    fetchMyChats();
  }, []);

  return (
    <PageContainer>
      <h1>내 채팅 목록</h1>
      <List>
        {chatRooms.map((room) => (
          <ListItem key={room.id}>
            <Link to={`/chats/${room.id}`}>
              채팅방 {room.id} (게시글 ID: {room.post_id})
            </Link>
          </ListItem>
        ))}
      </List>
    </PageContainer>
  );
};

export default ChatListPage;

const PageContainer = styled.div``;
const List = styled.ul`
  list-style: none;
  padding: 0;
`;
const ListItem = styled.li`
  padding: 15px;
  border-bottom: 1px solid #eee;
`;