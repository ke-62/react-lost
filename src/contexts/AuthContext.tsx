import React, { createContext, useContext, useState, ReactNode } from 'react';

// 이 Context가 어떤 값들을 가질지 타입을 정의합니다.
interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => void; // 실제 토큰을 받아 처리하도록 준비합니다.
  logout: () => void;
  // 나중에 사용자 정보를 저장할 수도 있습니다.
  // user: User | null; 
}

// Context를 생성합니다.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 다른 컴포넌트들이 Context를 쉽게 사용할 수 있도록 도와주는 커스텀 훅입니다.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider 컴포넌트입니다. 앱 전체를 감싸서 로그인 상태를 모든 곳에 전파합니다.
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 앱이 처음 시작될 때 localStorage에 토큰이 있는지 확인하여 초기 로그인 상태를 결정합니다.
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('authToken'));

  // 로그인 함수: 나중에 실제 백엔드와 연동할 때 이 함수만 수정하면 됩니다.
  const login = (token: string) => {
    localStorage.setItem('authToken', token); // 실제 토큰을 저장합니다.
    setIsLoggedIn(true);
  };

  // 로그아웃 함수
  const logout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  const value = { isLoggedIn, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};