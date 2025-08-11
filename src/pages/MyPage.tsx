// /src/pages/MyPage.tsx
// 마이페이지
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useAuth from '../components/hooks/useAuth';
import { getPosts } from '../api/postApi';
import { Post } from '../types';
import PostList from '../components/post/PostList';

const MyPage = () => {
  const { user } = useAuth();
  const [myPosts, setMyPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchMyPosts = async () => {
      // TODO: 백엔드에 user_id로 필터링하는 기능 구현 후 API 호출
      console.log('내가 쓴 글 목록을 불러옵니다.');
    };
    if (user) {
      fetchMyPosts();
    }
  }, [user]);

  if (!user) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <PageContainer>
      <h1>마이페이지</h1>
      <ProfileSection>
        <h2>회원 정보</h2>
        <p>닉네임: {user.nickname}</p>
        <p>학번: {user.student_id}</p>
        <p>이메일: {user.email}</p>
        [cite_start]<button>회원정보 수정</button> {/* [cite: 34] */}
      </ProfileSection>
      <MyPostsSection>
        [cite_start]<h2>내가 쓴 글 보기</h2> {/* [cite: 35] */}
        <PostList posts={myPosts} />
      </MyPostsSection>
    </PageContainer>
  );
};

export default MyPage;

const PageContainer = styled.div``;
const ProfileSection = styled.section`
  margin-bottom: 40px;
`;
const MyPostsSection = styled.section``;