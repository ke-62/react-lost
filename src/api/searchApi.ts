// /src/api/searchApi.ts
// 검색(Search) 관련 API 함수 모음

import apiClient from '.';
import { Post } from '../types';

// 키워드 기반 통합 검색
export const searchByKeyword = (keyword: string) => {
  return apiClient.get<Post[]>('/search', { params: { keyword } });
};

// 이미지 기반 검색
export const searchByImage = (imageData: FormData) => {
  return apiClient.post<Post[]>('/search/image', imageData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};