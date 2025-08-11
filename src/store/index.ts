// /src/store/index.ts
// Zustand와 immer를 사용한 전역 상태 관리 파일

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer'; // 1. immer를 임포트합니다.
import { User } from '../types';

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
}

// 2. create 함수를 immer(...)로 감싸서 타입 안정성을 높입니다.
export const useUserStore = create(
  immer<UserState>((set) => ({
    user: null,
    isLoggedIn: false,
    // 3. setUser 내부 로직을 immer 스타일에 맞게 수정합니다.
    setUser: (user) =>
      set((state) => {
        // immer를 사용하면 state를 직접 수정하는 것처럼 코드를 작성할 수 있어
        // 타입 추론이 더 쉬워지고 안정성이 높아집니다.
        state.user = user;
        state.isLoggedIn = !!user;
      }),
  }))
);