// /src/api/authApi.ts
// 인증(Auth) 관련 API 함수 모음

import apiClient from '.';
import { AuthResponse, User, UserCredentials, UserSignupData } from '../types'; // types 폴더에 타입 정의 필요

// 회원가입
export const signup = (data: UserSignupData) => {
  return apiClient.post('/auth/signup', data);
};

// 로그인
export const login = (credentials: UserCredentials) => {
  // 백엔드에서 user 정보와 accessToken을 함께 보내준다고 가정
  return apiClient.post<AuthResponse>('/auth/login', credentials);
};

// 로그아웃
export const logout = () => {
  return apiClient.post('/auth/logout');
};

// 내 정보 확인
export const getMe = () => {
  return apiClient.get<User>('/auth/me');
};