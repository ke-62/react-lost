// /src/types/index.ts
// 기획서의 데이터베이스 스키마를 기반으로 프로젝트에서 사용할 공통 타입을 정의합니다.

// 사용자 정보
export interface User {
  id: number;
  student_id: string;
  nickname: string;
  email: string;
  created_at: string;
  updated_at: string;
}

// 게시글 정보
export interface Post {
  id: number;
  user_id: number;
  type: 'lost' | 'found';
  title: string;
  content?: string;
  image_url?: string;
  item_date: string;
  location_id: number;
  location_detail?: string;
  status: 'pending' | 'completed'; // 'pending'은 보관중/찾는중을 의미
  created_at: string;
  updated_at: string;
}

// 장소(건물) 정보
export interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

// 채팅방 정보
export interface ChatRoom {
  id: number;
  post_id: number;
  created_at: string;
}

// 메시지 정보
export interface Message {
  id: number;
  chat_id: number;
  user_id: number;
  content: string;
  is_read: boolean;
  created_at: string;
}

// 로그인 시 필요한 데이터 타입
export interface UserCredentials {
  student_id: string;
  password: string;
}

// 회원가입 시 필요한 데이터 타입
export interface UserSignupData extends UserCredentials {
  nickname: string;
  email: string;
}

// 로그인 성공 시 백엔드로부터 받을 응답 타입
export interface AuthResponse {
  user: User;
  accessToken: string;
}

// 지도에 표시될 건물 정보 타입
export interface CampusBuilding {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

// 지도에 표시될 요약 정보 타입
export interface MapSummary extends CampusBuilding {
  count: number;
}