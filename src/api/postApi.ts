// /src/apis/postsApi.ts
// 기획서의 게시글(Posts) API 명세에 따른 함수 모음 [cite: 109]
import apiClient from '.';
import { Post } from '../types';

interface GetPostsParams {
  page: number;
  limit: number;
  type: 'lost' | 'found';
  status: 'pending' | 'completed';
}

// GET /posts: 게시글 목록 조회 [cite: 113]
export const getPosts = (params: GetPostsParams) => {
  return apiClient.get<Post[]>('/posts', { params });
};

// GET /posts/:id: 특정 게시글 상세 조회 [cite: 115]
export const getPostById = (id: number) => {
  return apiClient.get<Post>(`/posts/${id}`);
};

// POST /posts: 새 게시글 작성 [cite: 110]
export const createPost = (postData: FormData) => {
  return apiClient.post('/posts', postData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// PATCH /posts/:id/status: 게시글 상태 변경 [cite: 117]
export const updatePostStatus = (id: number, status: 'pending' | 'completed') => {
  return apiClient.patch(`/posts/${id}/status`, { status });
};