// /src/api/chatApi.ts
// 채팅(Chats) 관련 API 함수 모음

import apiClient from '.';
import { ChatRoom, Message } from '../types';

// 새 채팅방 생성
export const createChat = (postId: number, receiverId: number) => {
  return apiClient.post<ChatRoom>('/chats', { postId, receiverId });
};

// 내 채팅방 목록 조회
export const getMyChats = () => {
  return apiClient.get<ChatRoom[]>('/chats');
};

// 특정 채팅방의 메시지 목록 조회
export const getChatMessages = (chatId: number) => {
  return apiClient.get<Message[]>(`/chats/${chatId}/messages`);
};