// 사용자 정보
export interface User {
  id: number;
  student_id: string; // 학번
  nickname: string;   // 닉네임
  password: string;   // 비밀번호
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
  status: 'pending' | 'completed'; 
  created_at: string;
  updated_at: string;
}

export interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export interface ChatRoom {
  id: number;
  post_id: number;
  created_at: string;
}

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
