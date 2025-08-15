// 분실물/습득물 게시글 목록을 보여주는 페이지
import React, { useState, useEffect } from 'react';
import { getPosts } from '../api/postApi';
import { Post } from '../types';

const PostListPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [type, setType] = useState<'lost' | 'found'>('lost');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // 페이지네이션(20개씩) 및 타입 필터링 적용
        const res = await getPosts({ page: 1, limit: 20, type, status: 'pending' });
        setPosts(res.data);
      } catch (error) {
        console.error("게시글을 불러오는데 실패했습니다.", error);
      }
    };
    fetchPosts();
  }, [type]);

  return (
    <div>
      <div>
        <button onClick={() => setType('lost')}>분실물</button>
        <button onClick={() => setType('found')}>습득물</button>
      </div>
      <h1>{type === 'lost' ? '분실물' : '습득물'} 목록</h1>
      <div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} style={{ border: '1px solid #ccc', margin: '1rem', padding: '1rem' }}>
              <h3>{post.title}</h3>
              <p>상세 위치: {post.location_detail}</p>
              <p>상태: {post.status === 'pending' ? '찾는 중/보관 중' : '전달 완료'} [cite: 85]</p>
            </div>
          ))
        ) : (
          <p>등록된 게시글이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default PostListPage;