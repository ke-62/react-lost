import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/layout/Header';

interface Post {
  id: number;
  title: string;
  lostDate: string;
  lostLocation: string;
  itemCategory: string;
  itemStatus: string;
}

// 분실물 임시 데이터 (20개씩 페이지 분할)
const allPosts: Post[] = Array.from({ length: 100 }, (_, i) => ({
  id: 100 - i,
  title: '광개토관에서 에어팟 잃어버렸어요',
  lostDate: '25.08.15',
  lostLocation: '광개토관',
  itemCategory: '전자기기',
  itemStatus: '찾는중'
}));

const POSTS_PER_PAGE = 20;

const PostWritePage = () => {
  const navigate = useNavigate();
  const [type, setType] = useState<'lost' | 'found'>('lost'); // 분실물로 기본 설정
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handlePostClick = (postId: number) => {
    navigate(`/posts/${postId}`);
  };

  const handleWriteClick = () => {
    navigate('/write'); // PostNewPage로 이동
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getVisiblePages = () => {
    const maxVisible = 5;
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + maxVisible - 1);
    
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <PageWrapper>
      <Header />

      <SearchContainer>
        <SearchInputWrapper>
          <SearchInput placeholder="게시물을 검색하세요" />
          <SearchIcon>🔍</SearchIcon>
        </SearchInputWrapper>
      </SearchContainer>

      <ButtonGroup>
        <TabButton 
          $active={type === 'lost'} 
          onClick={() => setType('lost')}
        >
          분실물
        </TabButton>
        <TabButton 
          $active={type === 'found'} 
          onClick={() => setType('found')}
        >
          습득물
        </TabButton>
        <EveryTimeButton>에브리타임</EveryTimeButton>
      </ButtonGroup>

      <PostContainer>
        <TableContainer>
          <TableHeader>
            <HeaderCell style={{ width: '8%' }}>NO.</HeaderCell>
            <HeaderCell style={{ width: '35%' }}>제목</HeaderCell>
            <HeaderCell style={{ width: '15%' }}>분실일</HeaderCell>
            <HeaderCell style={{ width: '15%' }}>분실장소</HeaderCell>
            <HeaderCell style={{ width: '12%' }}>물품분류</HeaderCell>
            <HeaderCell style={{ width: '15%' }}>물품상태</HeaderCell>
          </TableHeader>
          
          {currentPosts.map((post) => (
            <PostRow key={post.id} onClick={() => handlePostClick(post.id)}>
              <RowCell style={{ width: '8%' }}>{post.id}</RowCell>
              <TitleCell style={{ width: '35%' }}>{post.title}</TitleCell>
              <RowCell style={{ width: '15%' }}>{post.lostDate}</RowCell>
              <RowCell style={{ width: '15%' }}>{post.lostLocation}</RowCell>
              <RowCell style={{ width: '12%' }}>{post.itemCategory}</RowCell>
              <RowCell style={{ width: '15%' }}>{post.itemStatus}</RowCell>
            </PostRow>
          ))}
        </TableContainer>

        <PaginationContainer>
          <Pagination>
            <PageButton 
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              ‹
            </PageButton>
            
            {getVisiblePages().map((pageNum) => (
              <PageNumber 
                key={pageNum}
                $active={pageNum === currentPage}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </PageNumber>
            ))}
            
            <PageButton 
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              ›
            </PageButton>
          </Pagination>
          
          <WriteButton onClick={handleWriteClick}>
            글쓰기
          </WriteButton>
        </PaginationContainer>
      </PostContainer>
    </PageWrapper>
  );
};

export default PostWritePage;

const PageWrapper = styled.div`
  background-color: transparent;
  min-height: 100vh;
  padding: 1.5rem;
`;


const Title = styled.h1`
  color: #5b4cdb;
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
`;

const LoginButton = styled.button`
  background: none;
  border: none;
  color: #999;
  font-size: 0.9rem;
  cursor: pointer;
  
  &:hover {
    color: #333;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  width: 500px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 25px;
  outline: none;
  font-size: 0.9rem;
  box-sizing: border-box;
  
  &:focus {
    border-color: #5b4cdb;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const TabButton = styled.button<{ $active: boolean }>`
  padding: 0.75rem 2rem;
  border: 1px solid #ddd;
  border-radius: 25px;
  background: ${({ $active }) => ($active ? '#5b4cdb' : 'white')};
  color: ${({ $active }) => ($active ? 'white' : '#666')};
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  
  &:hover {
    background: ${({ $active }) => ($active ? '#4a3eb8' : '#f5f5f5')};
  }
`;

const EveryTimeButton = styled.button`
  padding: 0.75rem 2rem;
  border: 1px solid #ddd;
  border-radius: 25px;
  background: white;
  color: #666;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const PostContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
`;

const TableContainer = styled.div`
  width: 100%;
`;

const TableHeader = styled.div`
  display: flex;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  padding: 1rem 0;
  font-weight: 600;
  color: #495057;
`;

const HeaderCell = styled.div`
  text-align: center;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PostRow = styled.div`
  display: flex;
  padding: 1rem 0;
  border-bottom: 1px solid #f1f3f4;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f8f9ff;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const RowCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  color: #666;
  text-align: center;
`;

const TitleCell = styled(RowCell)`
  justify-content: flex-start;
  padding-left: 1rem;
  color: #5b4cdb;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: #fafbfc;
  border-top: 1px solid #e9ecef;
`;

const Pagination = styled.div`
  display: flex;
  gap: 0.25rem;
  flex: 1;
  justify-content: center;
`;

const PageButton = styled.button<{ disabled?: boolean }>`
  padding: 0.5rem 0.75rem;
  border: 1px solid #ddd;
  background: white;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  border-radius: 4px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  
  &:hover:not(:disabled) {
    background: #f5f5f5;
  }
`;

const PageNumber = styled.button<{ $active?: boolean }>`
  padding: 0.5rem 0.75rem;
  border: 1px solid #ddd;
  background: ${({ $active }) => ($active ? '#5b4cdb' : 'white')};
  color: ${({ $active }) => ($active ? 'white' : '#666')};
  cursor: pointer;
  border-radius: 4px;
  font-size: 0.9rem;
  min-width: 36px;
  
  &:hover {
    background: ${({ $active }) => ($active ? '#4a3eb8' : '#f5f5f5')};
  }
`;

const WriteButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #5b4cdb;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  
  &:hover {
    background: #4a3eb8;
  }
`;