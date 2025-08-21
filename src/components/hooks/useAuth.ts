// /src/hooks/useAuth.ts
// 인증 관련 상태 및 함수를 쉽게 사용하기 위한 커스텀 훅
import { useUserStore } from '../../store'; // Zustand 스토어 경로 수정 필요

// 컴포넌트에서 인증 상태(isLoggedIn)와 사용자 정보(user)를 쉽게 가져오기 위해 사용합니다.
const useAuth = () => {
  const { user, isLoggedIn, setUser, logout } = useUserStore();
  return { user, isLoggedIn, setUser, logout };
};

export default useAuth;