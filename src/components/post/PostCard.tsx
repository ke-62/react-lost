// /src/components/post/PostCard.tsx
// 게시글 목록에 표시될 개별 게시글 카드 컴포넌트
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Post } from '../../types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <CardLink to={`/posts/${post.id}`}>
      <Card>
        <Image src={post.image_url || 'https://via.placeholder.com/150'} alt={post.title} />
        <Content>
          <h3>{post.title}</h3>
          <p>날짜: {post.item_date}</p>
          <p>상태: {post.status === 'pending' ? '처리중' : '완료'}</p>
        </Content>
      </Card>
    </CardLink>
  );
};

export default PostCard;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Card = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.3s;
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 15px;
`;