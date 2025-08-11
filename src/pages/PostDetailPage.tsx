// /src/pages/PostDetailPage.tsx
// 게시글 상세 정보를 보여주는 페이지
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getPostById } from '../api/postApi';
import { Post } from '../types';

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const res = await getPostById(parseInt(id, 10));
          setPost(res.data);
        } catch (error) {
          console.error('게시글 정보를 불러오는 데 실패했습니다.', error);
        }
      };
      fetchPost();
    }
  }, [id]);

  if (!post) {
    return <div>게시글을 불러오는 중...</div>;
  }

  return (
    <PageContainer>
      <Image src={post.image_url || 'https://via.placeholder.com/600x400'} alt={post.title} />
      <Title>{post.title}</Title>
      <Info>
        <span>분실/습득일: {post.item_date}</span>
        <span>상세위치: {post.location_detail}</span>
      </Info>
      <Content>{post.content}</Content>
      <ChatButton>쪽지(채팅) 보내기</ChatButton>
    </PageContainer>
  );
};

export default PostDetailPage;

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;
const Image = styled.img`
  width: 100%;
  max-height: 500px;
  object-fit: contain;
`;
const Title = styled.h1`
  margin-top: 20px;
`;
const Info = styled.div`
  color: #666;
  margin-bottom: 20px;
  span {
    margin-right: 20px;
  }
`;
const Content = styled.p`
  line-height: 1.6;
  min-height: 150px;
`;
const ChatButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
`;