// /src/apis/index.ts
// API 요청을 위한 기본 axios 인스턴스 설정 파일
import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api/v1', // BaseURL 설정 [cite: 103]
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: API 요청 시 헤더에 JWT 토큰을 추가합니다. [cite: 108]
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;