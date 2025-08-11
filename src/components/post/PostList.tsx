// /src/components/post/PostList.tsx
// PostCard 컴포넌트들을 목록 형태로 렌더링하는 컴포넌트
import React from 'react';
import styled from 'styled-components';
import { Post } from '../../types';
import PostCard from './PostCard';

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <ListContainer>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </ListContainer>
  );
};

export default PostList;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;